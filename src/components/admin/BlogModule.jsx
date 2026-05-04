import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase.client';

export default function BlogModule() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Voltag Gym',
    imageUrl: '',
    keywords: ''
  });

  const loadPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'blog_posts'));
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by date descending
      postsData.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(postsData);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title if we are writing the title and slug is empty or was auto-generated
    if (name === 'title') {
      const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') ? generatedSlug : prev.slug
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) return;

    try {
      const postRef = doc(db, 'blog_posts', formData.slug);
      await setDoc(postRef, {
        ...formData,
        createdAt: editingPost ? editingPost.createdAt : Date.now(),
        updatedAt: Date.now()
      });
      
      setFormData({ title: '', slug: '', excerpt: '', content: '', author: 'Voltag Gym', imageUrl: '', keywords: '' });
      setEditingPost(null);
      loadPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error al guardar el post.");
    }
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingPost(post);
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('¿Seguro que deseas eliminar este artículo? Esta acción no se puede deshacer.')) return;
    try {
      await deleteDoc(doc(db, 'blog_posts', slug));
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const cancelEdit = () => {
    setFormData({ title: '', slug: '', excerpt: '', content: '', author: 'Voltag Gym', imageUrl: '', keywords: '' });
    setEditingPost(null);
  };

  return (
    <div className="admin-module">
      <div className="module-header">
        <h2>{editingPost ? 'Editar Artículo' : 'Nuevo Artículo (SEO)'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Título (H1)</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              required 
              placeholder="Ej: Las 5 mejores rutinas para ganar masa muscular"
            />
          </div>
          <div className="form-group">
            <label>Slug (URL) <small>(Importante para SEO)</small></label>
            <input 
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleInputChange} 
              required 
              disabled={editingPost !== null}
              placeholder="ej: rutinas-ganar-masa-muscular"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Extracto (Meta Description)</label>
          <textarea 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleInputChange} 
            rows="2" 
            required
            placeholder="Breve resumen del artículo que aparecerá en Google..."
          />
        </div>

        <div className="form-group">
          <label>Palabras Clave (Keywords separadas por coma)</label>
          <input 
            type="text" 
            name="keywords" 
            value={formData.keywords} 
            onChange={handleInputChange} 
            placeholder="ej: gimnasio candelaria, ganar masa muscular, voltag gym"
          />
        </div>

        <div className="form-group">
          <label>Contenido Principal (Markdown o HTML Básico)</label>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleInputChange} 
            rows="10" 
            required
            placeholder="Escribe aquí el contenido del artículo. Puedes usar HTML básico como <h2>, <strong>, <p>, <ul> y <li>."
            style={{ fontFamily: 'monospace' }}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>URL Imagen Destacada</label>
            <input 
              type="url" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleInputChange} 
              placeholder="https://..."
            />
          </div>
          <div className="form-group">
            <label>Autor</label>
            <input 
              type="text" 
              name="author" 
              value={formData.author} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>

        <div className="form-actions">
          {editingPost && (
            <button type="button" className="btn-cancel" onClick={cancelEdit}>
              Cancelar Edición
            </button>
          )}
          <button type="submit" className="btn-save">
            {editingPost ? 'Actualizar Artículo' : 'Publicar Artículo'}
          </button>
        </div>
      </form>

      <div className="module-header" style={{ marginTop: '40px' }}>
        <h2>Artículos Publicados</h2>
      </div>

      {loading ? (
        <p>Cargando artículos...</p>
      ) : posts.length === 0 ? (
        <p className="empty-state">No hay artículos publicados todavía.</p>
      ) : (
        <div className="items-list">
          {posts.map(post => (
            <div key={post.id} className="list-item" style={{ alignItems: 'flex-start' }}>
              <div className="item-info">
                <h3>{post.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                  /{post.slug} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p style={{ fontSize: '0.9rem' }}>{post.excerpt}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(post)} className="btn-edit">
                  ✏️ Editar
                </button>
                <button onClick={() => handleDelete(post.id)} className="btn-delete">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

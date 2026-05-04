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
      <div className="admin-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={styles.title}>{editingPost ? 'Editar Artículo' : 'Nuevo Artículo (SEO)'}</h1>
          <p style={styles.subtitle}>Redacta artículos para posicionar en Google. Asegúrate de usar palabras clave relevantes.</p>
        </div>
      </div>

      <div style={styles.section}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="admin-module-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Título (H1)</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                style={styles.input}
                required 
                placeholder="Ej: Las 5 mejores rutinas para ganar masa muscular"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Slug (URL amigable)</label>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleInputChange} 
                style={{ ...styles.input, opacity: editingPost ? 0.5 : 1 }}
                required 
                disabled={editingPost !== null}
                placeholder="ej: rutinas-ganar-masa-muscular"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Extracto (Meta Description para Google)</label>
            <textarea 
              name="excerpt" 
              value={formData.excerpt} 
              onChange={handleInputChange} 
              style={{ ...styles.input, minHeight: '60px' }}
              rows="2" 
              required
              placeholder="Breve resumen persuasivo del artículo..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Palabras Clave (Keywords separadas por coma)</label>
            <input 
              type="text" 
              name="keywords" 
              value={formData.keywords} 
              onChange={handleInputChange} 
              style={styles.input}
              placeholder="ej: gimnasio candelaria, ganar masa muscular, voltag gym"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contenido Principal (Markdown)</label>
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleInputChange} 
              style={{ ...styles.input, minHeight: '300px', fontFamily: 'monospace' }}
              rows="10" 
              required
              placeholder="Escribe aquí el contenido del artículo. Usa # para títulos, ** para negrita."
            />
          </div>

          <div className="admin-module-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>URL Imagen Destacada</label>
              <input 
                type="url" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleInputChange} 
                style={styles.input}
                placeholder="https://..."
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Autor</label>
              <input 
                type="text" 
                name="author" 
                value={formData.author} 
                onChange={handleInputChange} 
                style={styles.input}
                required 
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {editingPost && (
              <button type="button" onClick={cancelEdit} style={{ ...styles.button, background: '#333' }}>
                Cancelar Edición
              </button>
            )}
            <button type="submit" style={styles.button}>
              {editingPost ? 'Actualizar Artículo' : 'Publicar Artículo'}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '48px 0 24px 0' }}>
        <div>
          <h2 style={styles.title}>Artículos Publicados</h2>
          <p style={styles.subtitle}>Gestiona el contenido de tu blog.</p>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#aaa' }}>Cargando artículos...</p>
      ) : posts.length === 0 ? (
        <div style={styles.section}>
          <p style={{ color: '#888', textAlign: 'center', margin: 0 }}>No hay artículos publicados todavía.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map(post => (
            <div key={post.id} style={{ ...styles.section, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', marginBottom: 0 }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>{post.title}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 8px 0' }}>
                  /{post.slug} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>{post.excerpt}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => handleEdit(post)} style={{ background: 'transparent', border: '1px solid #4caf50', color: '#4caf50', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(post.id)} style={{ background: 'transparent', border: '1px solid #d41920', color: '#d41920', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  title: { fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: '0 0 8px 0', color: '#fff' },
  subtitle: { color: '#888', margin: 0 },
  section: { background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', borderRadius: '12px', marginBottom: '24px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#aaa', fontSize: '0.8rem', fontWeight: '600' },
  input: { background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', color: '#fff', borderRadius: '6px', outline: 'none' },
  button: { background: '#d41920', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
};

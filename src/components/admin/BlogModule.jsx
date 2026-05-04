import React, { useState, useEffect, useMemo, useRef } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../utils/firebase.client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogModule() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const quillRef = useRef(null);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = React.useCallback((content) => {
    setFormData(prev => {
      // Prevents infinite loop if content is identical
      if (prev.content === content) return prev;
      return { ...prev, content };
    });
  }, []);

  const generateSEO = () => {
    let newSlug = formData.slug;
    let newExcerpt = formData.excerpt;
    let newKeywords = formData.keywords;

    if (!newSlug && formData.title) {
      newSlug = formData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (!newExcerpt && formData.content) {
      // Remove HTML tags for excerpt
      const plainText = formData.content.replace(/<[^>]+>/g, ' ');
      newExcerpt = plainText.substring(0, 150).trim() + '...';
    }

    if (!newKeywords && formData.title) {
      const words = formData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').filter(w => w.length > 3);
      newKeywords = words.join(', ');
    }

    return { ...formData, slug: newSlug, excerpt: newExcerpt, keywords: newKeywords };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("El título y el contenido son obligatorios.");
      return;
    }

    const finalData = generateSEO();
    if (!finalData.slug) return;

    try {
      const postRef = doc(db, 'blog_posts', finalData.slug);
      await setDoc(postRef, {
        ...finalData,
        createdAt: editingPost ? editingPost.createdAt : Date.now(),
        updatedAt: Date.now()
      });
      
      setFormData({ title: '', slug: '', excerpt: '', content: '', author: 'Voltag Gym', imageUrl: '', keywords: '' });
      setEditingPost(null);
      setShowAdvanced(false);
      loadPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error al guardar el post.");
    }
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingPost(post);
    setShowAdvanced(true);
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
    setShowAdvanced(false);
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      setIsUploading(true);
      const storageRef = ref(storage, `blog_images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Error uploading image:', error);
          setIsUploading(false);
          alert('Error al subir la imagen.');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', downloadURL);
          setIsUploading(false);
        }
      );
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  return (
    <div className="admin-module">
      <div className="admin-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={styles.title}>{editingPost ? 'Editar Artículo' : 'Nuevo Artículo'}</h1>
          <p style={styles.subtitle}>Escribe el artículo de forma natural. El SEO se generará automáticamente.</p>
        </div>
      </div>

      <div style={styles.section}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Título del Artículo</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              style={{ ...styles.input, fontSize: '1.2rem', padding: '16px' }}
              required 
              placeholder="Escribe un título atractivo aquí..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contenido Principal (Añade imágenes, links y formato)</label>
            <div style={{ background: '#fff', color: '#000', borderRadius: '6px', overflow: 'hidden' }}>
              <ReactQuill 
                ref={quillRef}
                theme="snow" 
                value={formData.content} 
                onChange={handleContentChange} 
                modules={modules}
                style={{ height: '350px', background: '#fff' }}
                placeholder="Empieza a escribir tu historia..."
              />
            </div>
            {isUploading && <span style={{ color: '#4caf50', fontSize: '0.85rem' }}>Subiendo imagen al servidor...</span>}
          </div>

          <div className="admin-module-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px' }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>URL Imagen Principal (Portada)</label>
              <input 
                type="url" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleInputChange} 
                style={styles.input}
                placeholder="https://... (Opcional)"
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

          <div>
            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)} 
              style={{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
            >
              {showAdvanced ? '▼ Ocultar opciones SEO' : '▶ Mostrar opciones SEO Avanzadas (Autogenerado)'}
            </button>
            
            {showAdvanced && (
              <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '16px' }}>Si dejas estos campos vacíos, el sistema los autogenerará de forma optimizada basándose en tu título y contenido.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Slug (URL personalizada)</label>
                    <input 
                      type="text" 
                      name="slug" 
                      value={formData.slug} 
                      onChange={handleInputChange} 
                      style={{ ...styles.input, opacity: editingPost ? 0.5 : 1 }}
                      disabled={editingPost !== null}
                      placeholder="ej: mi-nuevo-articulo (Opcional)"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Meta Description (Extracto para Google)</label>
                    <textarea 
                      name="excerpt" 
                      value={formData.excerpt} 
                      onChange={handleInputChange} 
                      style={{ ...styles.input, minHeight: '60px' }}
                      rows="2" 
                      placeholder="Resumen del artículo (Opcional)"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Palabras Clave (Keywords)</label>
                    <input 
                      type="text" 
                      name="keywords" 
                      value={formData.keywords} 
                      onChange={handleInputChange} 
                      style={styles.input}
                      placeholder="ej: fitness, candelaria (Opcional)"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {editingPost && (
              <button type="button" onClick={cancelEdit} style={{ ...styles.button, background: '#333' }}>
                Cancelar Edición
              </button>
            )}
            <button type="submit" style={styles.button}>
              {editingPost ? 'Actualizar Artículo' : 'Publicar Artículo con SEO'}
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
                <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>{post.excerpt ? post.excerpt.substring(0, 80) + '...' : ''}</p>
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

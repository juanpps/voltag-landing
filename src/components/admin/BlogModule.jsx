import React, { useState, useEffect } from 'react';
import { getBlogPosts, saveBlogPostsLocally } from '../../utils/content';

export default function BlogModule() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Voltag Gym',
    imageUrl: '',
    keywords: ''
  });

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      const generatedSlug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      setFormData(prev => ({
        ...prev,
        title: value,
        slug: editingPost ? prev.slug : generatedSlug
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post.slug);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || 'Voltag Gym',
      imageUrl: post.imageUrl || '',
      keywords: post.keywords || ''
    });
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Voltag Gym',
      imageUrl: '',
      keywords: ''
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert('El título y el slug son obligatorios.');
      return;
    }

    const newPost = {
      id: formData.slug,
      ...formData,
      createdAt: editingPost 
        ? (posts.find(p => p.slug === editingPost)?.createdAt || Date.now()) 
        : Date.now()
    };

    let updatedPosts;
    if (editingPost) {
      updatedPosts = posts.map(p => p.slug === editingPost ? newPost : p);
    } else {
      updatedPosts = [newPost, ...posts];
    }

    setPosts(updatedPosts);
    saveBlogPostsLocally(updatedPosts);
    setMessage('✅ Artículo guardado con éxito.');
    setTimeout(() => setMessage(''), 4000);
    handleCancel();
  };

  const handleDelete = (slug) => {
    if (confirm(`¿Estás seguro de eliminar el artículo "${slug}"?`)) {
      const updated = posts.filter(p => p.slug !== slug);
      setPosts(updated);
      saveBlogPostsLocally(updated);
      setMessage('🗑️ Artículo eliminado.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "blog.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 6px 0' }}>Gestor de Blog y Artículos SEO</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>
            Crea y edita contenido optimizado para posicionar Voltag Gym en Google.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            type="button"
            onClick={downloadJson}
            style={{ ...btnStyle, background: '#222', border: '1px solid rgba(255,255,255,0.2)' }}
            title="Descarga el archivo JSON para el repositorio"
          >
            📥 Descargar blog.json
          </button>
        </div>
      </div>

      {message && (
        <div style={{ padding: '12px 16px', background: message.startsWith('✅') ? 'rgba(74, 222, 128, 0.1)' : 'rgba(212, 25, 32, 0.1)', borderLeft: '4px solid', borderColor: message.startsWith('✅') ? '#4ade80' : '#d41920', color: '#fff', marginBottom: '24px' }}>
          {message}
        </div>
      )}

      {/* Form Editor */}
      <form onSubmit={handleSave} style={{ ...cardStyle, marginBottom: '32px' }}>
        <h3 style={{ color: '#fff', margin: '0 0 20px 0', fontSize: '1.2rem' }}>
          {editingPost ? '✏️ Editando Artículo' : '➕ Crear Nuevo Artículo'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={labelStyle}>Título del Artículo (H1)</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              placeholder="Ej: 5 Razones para entrenar fuerza" 
              style={inputStyle} 
              required 
            />
          </div>

          <div>
            <label style={labelStyle}>Slug URL (Sin espacios)</label>
            <input 
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleInputChange} 
              placeholder="5-razones-entrenar-fuerza" 
              style={inputStyle} 
              required 
            />
          </div>

          <div>
            <label style={labelStyle}>Autor</label>
            <input 
              type="text" 
              name="author" 
              value={formData.author} 
              onChange={handleInputChange} 
              placeholder="Coach García" 
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={labelStyle}>Ruta de Imagen Destacada</label>
            <input 
              type="text" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleInputChange} 
              placeholder="/images/gallery/gym-interior-new.jpg" 
              style={inputStyle} 
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Keywords SEO (separadas por comas)</label>
          <input 
            type="text" 
            name="keywords" 
            value={formData.keywords} 
            onChange={handleInputChange} 
            placeholder="gimnasio manzanares, gym candelaria, hipertrofia" 
            style={inputStyle} 
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Extracto / Meta Descripción</label>
          <textarea 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleInputChange} 
            rows={2} 
            placeholder="Breve resumen que aparece en las tarjetas y resultados de Google..." 
            style={{ ...inputStyle, resize: 'vertical' }} 
            required 
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Contenido (Markdown soportado: ### títulos, - listas, **negrita**)</label>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleInputChange} 
            rows={10} 
            placeholder="Escribe el artículo aquí en formato Markdown..." 
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} 
            required 
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" style={btnStyle}>
            {editingPost ? 'Actualizar Artículo' : 'Publicar Artículo'}
          </button>
          {editingPost && (
            <button 
              type="button" 
              onClick={handleCancel}
              style={{ ...btnStyle, background: '#333' }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Posts List */}
      <div>
        <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '16px' }}>Artículos Publicados ({posts.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map(p => (
            <div key={p.slug} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h4 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '1.05rem' }}>{p.title}</h4>
                <span style={{ color: '#888', fontSize: '0.8rem' }}>
                  /blog/{p.slug} • Por {p.author || 'Voltag'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a 
                  href={`/blog/${p.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ ...btnStyle, background: '#1c1c1c', border: '1px solid #333', textDecoration: 'none' }}
                >
                  👁️ Ver
                </a>
                <button 
                  onClick={() => handleEdit(p)}
                  style={{ ...btnStyle, background: '#2563eb' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(p.slug)}
                  style={{ ...btnStyle, background: '#991b1b' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#0d0d0d',
  border: '1px solid rgba(255,255,255,0.06)',
  padding: '24px',
  borderRadius: '4px',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  background: '#151515',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '10px 12px',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  outline: 'none',
};

const btnStyle = {
  background: '#d41920',
  color: '#fff',
  border: 'none',
  padding: '10px 18px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '0.85rem',
  letterSpacing: '1px',
};

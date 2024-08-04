import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/api/generate-og-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setOgImageUrl(response.data.ogImageUrl);
    } catch (error) {
      console.error('Error generating OG image:', error);
      setError('Failed to generate OG image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ogImageUrl) {
      const metaTag = document.querySelector('meta[property="og:image"]');
      if (metaTag) {
        metaTag.setAttribute('content', ogImageUrl);
      } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.setAttribute('property', 'og:image');
        newMetaTag.setAttribute('content', ogImageUrl);
        document.head.appendChild(newMetaTag);
      }
    }
  }, [ogImageUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <span className="logo">SP</span>
        <h1>OG Image Generator</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Post Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="file-input-label">
              <span className="file-input-text">
                {image ? 'Image selected' : 'Choose an image'}
              </span>
              <span className="file-input-button">Browse</span>
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="file-input"
            />
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            <span className="button-icon">🖼️</span>
            {isLoading ? 'Generating...' : 'Generate OG Image'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {isLoading && <div className="loading">Generating OG Image...</div>}
        {ogImageUrl && (
          <div className="og-image-preview">
            <h2>Generated OG Image:</h2>
            <img src={ogImageUrl} alt="OG Image" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
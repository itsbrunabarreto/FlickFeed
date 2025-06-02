import React, { useState } from 'react';
import axiosClient from '../../axiosClient';
import './MovieFormStore.css';

export default function MovieFormStore() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!title || !releaseYear || !genre) {
      setErrorMsg('Título, Ano e Gênero são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('release_year', releaseYear);
      formData.append('genre', genre);
      if (image) formData.append('image', image);

      const response = await axiosClient.post('/movie/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg('Filme cadastrado com sucesso!');
      setTitle('');
      setDescription('');
      setReleaseYear('');
      setGenre('');
      setImage(null);
      setPreview(null);
    } catch (error) {
      setErrorMsg('Erro ao cadastrar o filme. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-store-container">
      <h1>Adicionar Novo Filme</h1>
      <form className="movie-store-form" onSubmit={handleSubmit}>

        <div className="movie-image-preview">
          {preview ? (
            <img src={preview} alt="Preview do Filme" />
          ) : (
            <div className="image-placeholder">Imagem do Filme</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="movie-form-fields">
          <label>
            Título <span className="required">*</span>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nome do filme"
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Sinopse do filme"
              rows="4"
            />
          </label>

          <label>
            Ano de Lançamento <span className="required">*</span>
            <input
              type="number"
              value={releaseYear}
              onChange={e => setReleaseYear(e.target.value)}
              placeholder="2024"
              min="1900"
              max="2100"
              required
            />
          </label>

          <label>
            Gênero <span className="required">*</span>
            <input
              type="text"
              value={genre}
              onChange={e => setGenre(e.target.value)}
              placeholder="Ex: Ação, Comédia"
              required
            />
          </label>

          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {successMsg && <p className="success-message">{successMsg}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Filme'}
          </button>
        </div>
      </form>
    </div>
  );
}

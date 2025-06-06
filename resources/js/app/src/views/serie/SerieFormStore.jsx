import React, { useState } from 'react';
import axiosClient from '../../axiosClient';
import './SerieFormStore.css';

export default function SerieFormStore() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startYear, setStartYear] = useState('');
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

    if (!title || !startYear || !genre) {
      setErrorMsg('Título, Ano de Início e Gênero são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('start_year', startYear);
      formData.append('genre', genre);
      if (image) formData.append('image', image);

      await axiosClient.post('/serie/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg('Série cadastrada com sucesso!');
      setTitle('');
      setDescription('');
      setStartYear('');
      setGenre('');
      setImage(null);
      setPreview(null);
    } catch (error) {
      setErrorMsg('Erro ao cadastrar a série. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="serie-store-container">
      <h1>Adicionar Nova Série</h1>
      <form className="serie-store-form" onSubmit={handleSubmit}>

        <div className="serie-image-preview">
          {preview ? (
            <img src={preview} alt="Preview da Série" />
          ) : (
            <div className="image-placeholder">Imagem da Série</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="serie-form-fields">
          <label>
            Título <span className="required">*</span>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nome da série"
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Sinopse da série"
              rows="4"
            />
          </label>

          <label>
            Ano de Início <span className="required">*</span>
            <input
              type="number"
              value={startYear}
              onChange={e => setStartYear(e.target.value)}
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
              placeholder="Ex: Drama, Comédia"
              required
            />
          </label>

          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {successMsg && <p className="success-message">{successMsg}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Série'}
          </button>
        </div>
      </form>
    </div>
  );
}

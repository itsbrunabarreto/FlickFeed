import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './SerieFormUpdate.css'; // CSS separado para séries, baseado no movie

export default function SerieFormUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    axiosClient.get(`/serie/show/${id}`)
      .then(({ data }) => {
        const serie = data.data;
        setTitle(serie.title || '');
        setDescription(serie.description || '');
        setReleaseYear(serie.release_year || '');
        setGenre(serie.genre || '');
        if (serie.image) {
          setPreview(`http://localhost:8000/storage/${serie.image}`);
        }
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg('Série não encontrada.');
        setLoading(false);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('release_year', releaseYear);
      formData.append('genre', genre);
      if (image) formData.append('image', image);

      await axiosClient.post(`/serie/update/${id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg('Série atualizada com sucesso!');
      setSaving(false);
      navigate(`/series/show/${id}`);

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.data;
        const messages = Object.values(errors).flat().join(' ');
        setErrorMsg(`Erro ao atualizar a série: ${messages}`);
      } else {
        setErrorMsg('Erro ao atualizar a série. Verifique os dados e tente novamente.');
      }
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando dados da série...</p>;

  return (
    <div className="serie-store-container">
      <h1>Editar Série</h1>
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
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows="4"
            />
          </label>

          <label>
            Ano de Lançamento <span className="required">*</span>
            <input
              type="number"
              value={releaseYear}
              onChange={e => setReleaseYear(e.target.value)}
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
              required
            />
          </label>

          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {successMsg && <p className="success-message">{successMsg}</p>}

          <button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Atualizar Série'}
          </button>
        </div>
      </form>
    </div>
  );
}

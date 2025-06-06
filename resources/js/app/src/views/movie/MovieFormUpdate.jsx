import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './MovieFormStore.css'; // reutiliza o CSS do form de criação

export default function MovieFormUpdate() {
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
    axiosClient.get(`/movie/show/${id}`)
      .then(({ data }) => {
        const movie = data.data;
        setTitle(movie.title || '');
        setDescription(movie.description || '');
        setReleaseYear(movie.release_year || '');
        setGenre(movie.genre || '');

        if (movie.image) {
          setPreview(`http://localhost:8000/storage/${movie.image}`);
        }

        setLoading(false);
      })
      .catch(() => {
        setErrorMsg('Filme não encontrado.');
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

      await axiosClient.post(`/movie/update/${id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg('Filme atualizado com sucesso!');
      setSaving(false);
      navigate(`/movie/show/${id}`);

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.data;
        const messages = Object.values(errors).flat().join(' ');
        setErrorMsg(`Erro ao atualizar o filme: ${messages}`);
      } else {
        setErrorMsg('Erro ao atualizar o filme. Verifique os dados e tente novamente.');
      }
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando dados do filme...</p>;

  return (
    <div className="movie-store-container">
      <h1>Editar Filme</h1>
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
            {saving ? 'Salvando...' : 'Atualizar Filme'}
          </button>
        </div>
      </form>
    </div>
  );
}

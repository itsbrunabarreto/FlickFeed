import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './MovieFormDelete.css';

export default function MovieFormDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    axiosClient.get(`/movie/show/${id}`)
      .then(({ data }) => {
        setMovie(data.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg('Filme não encontrado.');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosClient.delete(`/movie/destroy/${id}`);
      setSuccessMsg('Filme excluído com sucesso!');
      setTimeout(() => navigate('/movies'), 1500);
    } catch (error) {
      setErrorMsg('Erro ao excluir o filme. Tente novamente.');
      setDeleting(false);
    }
  };

  if (loading) return <p>Carregando dados do filme...</p>;
  if (!movie) return <p>Filme não encontrado.</p>;

  return (
    <div className="movie-delete-container">
      <h1>Excluir Filme</h1>
      <div className="movie-delete-card">
        {movie.image && (
        <img
            src={`http://localhost:8000/storage/${movie.image}`}
            alt={movie.title}
            className="movie-delete-image"
        />
        )}

        <div className="movie-delete-info">
          <h2>{movie.title}</h2>
          <p><strong>Ano:</strong> {movie.release_year}</p>
          <p><strong>Gênero:</strong> {movie.genre}</p>
          <p><strong>Descrição:</strong> {movie.description}</p>
        </div>
      </div>

      <p className="movie-delete-warning">Tem certeza que deseja excluir este filme?</p>

      {errorMsg && <p className="error-message">{errorMsg}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}

      <div className="movie-delete-actions">
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Excluindo...' : 'Sim, excluir'}
        </button>
        <button onClick={() => navigate(`/movie/show/${id}`)} disabled={deleting}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

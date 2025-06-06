import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './MovieFormShow.css';

export default function MovieFormShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient.get(`/movie/show/${id}`)
      .then(({ data }) => {
        setMovie(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Filme não encontrado.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-show-container">
      <button className="btn-back" onClick={() => navigate(-1)}>← Voltar</button>

      <div className="movie-details">
        <img
          src={`http://localhost:8000/storage/${movie.image}`}
          alt={movie.title}
          className="movie-image"
        />

        <div className="movie-info">
          <h1 className="movie-title">{movie.title} ({movie.release_year})</h1>
          <p className="movie-genre"><strong>Gênero:</strong> {movie.genre}</p>
          <p className="movie-description">{movie.description || 'Sem descrição disponível.'}</p>

          <Link to={`/movie/update/${movie.id}`} className="btn-edit">
            Editar Filme
          </Link>
        </div>
      </div>
    </div>
  );
}

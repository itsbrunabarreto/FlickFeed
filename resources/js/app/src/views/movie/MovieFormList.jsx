import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';
import './MovieFormList.css'; // CSS separado para estilos

export default function MovieFormList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosClient.get('/movie/index')
      .then(({ data }) => setMovies(data.data))
      .catch(error => console.error('Erro ao buscar filmes:', error));
  }, []);

  return (
    <div className="movie-page">
      <h1 className="movie-title">Filmes Populares</h1>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <Link to={`/movie/show/${movie.id}`}>
                <img
                  className="movie-image"
                  src={movie.image ? `http://localhost:8000/storage/${movie.image}` : 'https://via.placeholder.com/200x300?text=Sem+Imagem'}
                  alt={movie.title}
                />
              </Link>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_year}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}

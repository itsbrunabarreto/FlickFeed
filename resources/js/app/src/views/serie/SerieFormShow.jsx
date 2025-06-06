import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './SerieFormShow.css';

export default function SerieFormShow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [serie, setSerie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [rating, setRating] = useState(0);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    axiosClient.get(`/serie/show/${id}`)
      .then(({ data }) => {
        setSerie(data.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg('Série não encontrada.');
        setLoading(false);
      });

    axiosClient.get(`/episode/index/${id}`)
      .then(({ data }) => {
        setEpisodes(data.data);
      })
      .catch(() => {
        console.error('Erro ao buscar episódios.');
      });
  }, [id]);

  const handleRating = (value) => {
    setRating(value);
    // Aqui você pode chamar o endpoint de ratings se necessário
    // axiosClient.post('/ratings/store', { serie_id: id, rating: value })
  };

  const handleWatched = () => {
    setWatched(true);
    // Envie para o backend
    axiosClient.post('/watched-movies/store', { movie_id: id, type: 'serie' });
  };

  if (loading) return <p>Carregando série...</p>;
  if (!serie) return <p>{errorMsg}</p>;

  return (
    <div className="serie-show-container">
      <div className="serie-header">
        {serie.image && (
          <img
            src={`http://localhost:8000/storage/${serie.image}`}
            alt={serie.title}
            className="serie-image"
          />
        )}

        <div className="serie-info">
          <h1>{serie.title}</h1>
          <p><strong>Ano de lançamento:</strong> {serie.release_year}</p>
          <p><strong>Gênero:</strong> {serie.genre}</p>
          <p><strong>Descrição:</strong> {serie.description}</p>

          {/* Estrelas */}
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Botão assistir */}
          <button
            className={`watched-button ${watched ? 'watched' : ''}`}
            onClick={handleWatched}
            disabled={watched}
          >
            {watched ? 'Assistido' : 'Marcar como assistido'}
          </button>
        </div>
      </div>

      <hr />

      <h2>Episódios</h2>
      {episodes.length > 0 ? (
        <ul className="episode-list">
          {episodes.map(episode => (
            <li key={episode.id} className="episode-item" onClick={() => navigate(`/episode/show/${episode.id}`)}>
              <strong>{episode.title}</strong> – {episode.release_date}
              <br />
              <span>{episode.description}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum episódio encontrado para esta série.</p>
      )}

      <Link to={`/serie/update/${id}`}>Editar Série</Link>
      <button onClick={() => navigate('/serie')}>Voltar</button>
    </div>
  );
}

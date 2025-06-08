import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './SerieFormShow.css';

export default function SerieFormShow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [serie, setSerie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [rating, setRating] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);

  useEffect(() => {
    axiosClient.get(`/serie/show/${id}`).then(({ data }) => {
      setSerie(data.data);
    });

    axiosClient.get(`/episode/index/${id}`).then(({ data }) => {
      const eps = data.data;
      setEpisodes(eps);
      const seasonList = [...new Set(eps.map(ep => ep.season))];
      setSeasons(seasonList);
    });

    axiosClient.get(`/watched-episodes/index`).then(({ data }) => {
      const watched = data.data.find(item => item.series_id === parseInt(id));
      if (watched) setHasWatched(true);
    });

    axiosClient.get(`/ratings/index`).then(({ data }) => {
      const serieRating = data.data.find(r => r.serie_id === parseInt(id));
      if (serieRating) setRating(serieRating.rating);
    });
  }, [id]);

  const handleRating = (value) => {
    setRating(value);
    axiosClient.post(`/ratings/store`, {
      serie_id: id,
      rating: value
    }).catch(() => alert("Erro ao enviar avaliação."));
  };

  const markAsWatched = () => {
    axiosClient.post(`/watched-episodes/store`, {
      series_id: id
    }).then(() => {
      setHasWatched(true);
    }).catch(() => alert("Erro ao marcar como assistido."));
  };

  if (!serie) return <p>Carregando série...</p>;

  return (
    <div className="serie-show-container">
      <div className="serie-header">
        <img
          src={`http://localhost:8000/storage/${serie.image}`}
          alt={serie.title}
          className="serie-image"
        />

        <div className="serie-info">
          <h1>{serie.title}</h1>
          <p><strong>Ano de lançamento:</strong> {serie.release_year}</p>
          <p><strong>Gênero:</strong> {serie.genre}</p>
          <p><strong>Descrição:</strong> {serie.description}</p>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((val) => (
              <span
                key={val}
                onClick={() => handleRating(val)}
                className={val <= rating ? "star filled" : "star"}
              >★</span>
            ))}
          </div>

          <button onClick={markAsWatched} disabled={hasWatched}>
            {hasWatched ? 'Assistido' : 'Marcar como assistido'}
          </button>
        </div>
      </div>

      <hr />

      <h2>Temporadas</h2>
      {seasons.length > 0 ? (
        <ul className="season-list">
          {seasons.map(season => (
            <li key={season}>
              <Link to={`/serie/${id}/season/${season}`}>Temporada {season}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma temporada encontrada.</p>
      )}

      <div className="serie-actions">
        <Link to={`/serie/update/${id}`}>Editar Série</Link>
        <button onClick={() => navigate('/serie/index')}>Voltar</button>
      </div>
    </div>
  );
}

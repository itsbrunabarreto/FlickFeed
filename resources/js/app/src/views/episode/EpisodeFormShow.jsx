import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './EpisodeFormShow.css';

export default function EpisodeFormShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    axiosClient.get(`/episode/show/${id}`)
      .then(({ data }) => {
        setEpisode(data.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg('Episódio não encontrado.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando episódio...</p>;
  if (!episode) return <p>{errorMsg}</p>;

  return (
    <div className="episode-show-container">
      <h1>{episode.title}</h1>

      <p><strong>Temporada:</strong> {episode.season}</p>
      <p><strong>Episódio:</strong> {episode.episode_number}</p>
      <p><strong>Data de exibição:</strong> {episode.air_date}</p>
      <p><strong>Descrição:</strong> {episode.description}</p>

      <hr />

      <div className="episode-actions">
        <Link to={`/episode/update/${episode.id}`} className="btn edit-btn">Editar Episódio</Link>
        <button className="btn back-btn" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    </div>
  );
}

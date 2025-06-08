import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import { useNavigate } from 'react-router-dom';
import './EpisodeFormStore.css';

export default function EpisodeFormStore() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [season, setSeason] = useState('');
  const [episode_number, setEpisodeNumber] = useState('');
  const [series_id, setSeriesId] = useState('');
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axiosClient.get('/serie/index').then(({ data }) => {
      setSeries(data.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosClient.post('/episode/store', {
      title,
      season,
      episode_number,
      series_id
    })
    .then(() => navigate('/serie/index'))
    .catch(() => alert('Erro ao cadastrar episódio.'));
  };

  return (
    <div className="episode-form-container">
      <h2>Cadastrar Episódio</h2>
      <form onSubmit={handleSubmit}>
        <label>Título do Episódio</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Temporada</label>
        <input
          type="number"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
        />

        <label>Número do Episódio</label>
        <input
          type="number"
          value={episode_number}
          onChange={(e) => setEpisodeNumber(e.target.value)}
          required
        />

        <label>Série</label>
        <select value={series_id} onChange={(e) => setSeriesId(e.target.value)} required>
          <option value="">Selecione a série</option>
          {series.map(serie => (
            <option key={serie.id} value={serie.id}>{serie.title}</option>
          ))}
        </select>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

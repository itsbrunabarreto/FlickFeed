import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './EpisodeFormUpdate.css';

export default function EpisodeFormUpdate() {
  const { id } = useParams(); // ID do episódio
  const navigate = useNavigate();

  const [series, setSeries] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    season: '',
    episode_number: '',
    series_id: ''
  });

  useEffect(() => {
    // Carrega todas as séries para o select
    axiosClient.get('/serie/index')
      .then(({ data }) => setSeries(data.data));

    // Carrega os dados do episódio
    axiosClient.get(`/episode/show/${id}`)
      .then(({ data }) => setFormData(data.data))
      .catch(() => alert('Erro ao carregar dados do episódio.'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient.put(`/episode/update/${id}`, formData)
      .then(() => {
        alert('Episódio atualizado com sucesso!');
        navigate('/serie/index');
      })
      .catch(() => alert('Erro ao atualizar episódio.'));
  };

  return (
    <div className="episode-update-container">
      <h2>Editar Episódio</h2>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Descrição</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Duração (minutos)</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />

        <label>Temporada</label>
        <input type="number" name="season" value={formData.season} onChange={handleChange} required />

        <label>Número do Episódio</label>
        <input type="number" name="episode_number" value={formData.episode_number} onChange={handleChange} required />

        <label>Série</label>
        <select name="series_id" value={formData.series_id} onChange={handleChange} required>
          <option value="">Selecione uma série</option>
          {series.map(serie => (
            <option key={serie.id} value={serie.id}>{serie.title}</option>
          ))}
        </select>

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

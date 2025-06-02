import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';
import './SerieFormList.css';

export default function SerieFormList() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axiosClient.get('/series/index')
      .then(({ data }) => setSeries(data.data))
      .catch((error) => console.error('Erro ao buscar séries:', error));
  }, []);

  return (
    <div className="series-page">
      <div className="series-header">
        <h1>Séries em Destaque</h1>
        <Link to="/series/store" className="btn-add-serie">Adicionar Série</Link>
      </div>

      <div className="serie-card-grid">
        {series.length > 0 ? (
          series.map((serie) => (
            <div className="serie-card" key={serie.id}>
              <img
                src={serie.image ? `${import.meta.env.VITE_API_BASE_URL}/storage/${serie.image}` : '/no-image.png'}
                alt={serie.title}
              />
              <div className="serie-card-body">
                <h3 className="serie-card-title">{serie.title}</h3>
                <p className="serie-card-meta">
                  {serie.genre} • {serie.release_year}
                </p>
                <div className="serie-card-actions">
                  <Link to={`/series/show/${serie.id}`} className="btn-show">Ver</Link>
                  <Link to={`/series/update/${serie.id}`} className="btn-edit">Editar</Link>
                  <Link to={`/series/destroy/${serie.id}`} className="btn-delete">Excluir</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-series">Nenhuma série encontrada.</p>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';
import './SerieFormList.css';

export default function SerieFormList() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axiosClient.get('/serie/index') // ajuste a rota conforme sua API
      .then(({ data }) => setSeries(data.data))
      .catch(error => console.error('Erro ao buscar séries:', error));
  }, []);

  return (
    <div className="serie-page">
      <h1 className="serie-title">Séries Populares</h1>

      <div className="serie-grid">
        {series.length > 0 ? (
          series.map((serie) => (
            <div className="serie-card" key={serie.id}>
              <Link to={`/serie/show/${serie.id}`}>
                <img
                  className="serie-image"
                  src={serie.image ? `http://localhost:8000/storage/${serie.image}` : 'https://via.placeholder.com/200x300?text=Sem+Imagem'}
                  alt={serie.title}
                />
              </Link>
              <div className="serie-info">
                <h3>{serie.title}</h3>
                <p>{serie.release_year}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma série encontrada.</p>
        )}
      </div>
    </div>
  );
}

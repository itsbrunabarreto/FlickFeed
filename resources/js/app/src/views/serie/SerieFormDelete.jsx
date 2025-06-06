import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import './SerieFormDelete.css';

export default function SerieFormDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosClient.delete(`/serie/destroy/${id}`);
      setSuccessMsg('Série excluída com sucesso!');
      setTimeout(() => navigate('/series'), 1500);
    } catch (error) {
      setErrorMsg('Erro ao excluir a série. Tente novamente.');
      setDeleting(false);
    }
  };

  if (loading) return <p>Carregando dados da série...</p>;
  if (!serie) return <p>Série não encontrada.</p>;

  return (
    <div className="serie-delete-container">
      <h1>Excluir Série</h1>
      <div className="serie-delete-card">
        {serie.image && (
          <img
            src={`http://localhost:8000/storage/${serie.image}`}
            alt={serie.title}
            className="serie-delete-image"
          />
        )}

        <div className="serie-delete-info">
          <h2>{serie.title}</h2>
          <p><strong>Ano de Início:</strong> {serie.start_year}</p>
          <p><strong>Gênero:</strong> {serie.genre}</p>
          <p><strong>Descrição:</strong> {serie.description}</p>
        </div>
      </div>

      <p className="serie-delete-warning">Tem certeza que deseja excluir esta série?</p>

      {errorMsg && <p className="error-message">{errorMsg}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}

      <div className="serie-delete-actions">
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Excluindo...' : 'Sim, excluir'}
        </button>
        <button onClick={() => navigate(`/serie/show/${id}`)} disabled={deleting}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

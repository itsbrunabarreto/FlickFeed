import React, { useState } from 'react';
import axios from 'axios';

export default function ListFormDelete({ list, onDelete, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setError('');
    setLoading(true);

    try {
      // Supondo rota DELETE /api/lists/{id}
      await axios.delete(`/api/lists/${list.id}`);
      onDelete(list.id);
    } catch (err) {
      setError('Erro ao excluir a lista. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-form-delete">
      <p>Tem certeza que deseja excluir a lista <strong>{list.name}</strong>?</p>
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <button onClick={handleDelete} disabled={loading} className="delete-btn">
          {loading ? 'Excluindo...' : 'Excluir'}
        </button>
        <button onClick={onCancel} disabled={loading} className="cancel-btn">
          Cancelar
        </button>
      </div>
    </div>
  );
}

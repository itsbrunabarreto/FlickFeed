import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListFormUpdate({ list, onUpdate, onCancel }) {
  const [name, setName] = useState(list?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(list?.name || '');
  }, [list]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('O nome da lista é obrigatório');
      return;
    }

    setLoading(true);

    try {
      // Supondo que a rota para update seja PUT /api/lists/{id}
      await axios.put(`/api/lists/${list.id}`, { name });
      onUpdate({ ...list, name });
    } catch (err) {
      setError('Erro ao atualizar lista. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="list-form-update" onSubmit={handleSubmit}>
      <label htmlFor="listNameEdit">Editar nome da lista</label>
      <input
        id="listNameEdit"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o novo nome da lista"
        disabled={loading}
        autoFocus
      />
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={onCancel} disabled={loading} className="cancel-btn">
          Cancelar
        </button>
      </div>
    </form>
  );
}

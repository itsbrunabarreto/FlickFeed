import React, { useState } from 'react';
import axios from 'axios';

export default function ListFormStore({ onListCreated }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('O nome da lista é obrigatório');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('/api/lists/store', { name });
      setName('');
      onListCreated(response.data);
    } catch (err) {
      setError('Erro ao criar lista. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="list-form-store" onSubmit={handleSubmit}>
      <label htmlFor="listName">Nome da nova lista</label>
      <input
        id="listName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome da lista"
        disabled={loading}
        autoFocus
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Lista'}
      </button>
    </form>
  );
}

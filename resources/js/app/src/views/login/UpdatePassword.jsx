import { Link } from 'react-router-dom';
import './UpdatePassword.css';

export default function UpdatePassword() {
  return (
    <div className="update-password-container">
      <form className="update-password-form">
        <h1 className="update-title">Alterar Senha</h1>

        <input
          type="password"
          placeholder="Nova Senha"
          className="update-input"
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          className="update-input"
        />

        <button className="update-button">Salvar</button>

        <p className="update-message">
          Acesso ao sistema? <Link to="/login" className="update-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

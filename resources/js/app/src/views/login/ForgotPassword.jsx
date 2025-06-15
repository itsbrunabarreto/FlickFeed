import { Link } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
  return (
    <div className="forgot-container">
      <form className="forgot-form">
        <h1 className="forgot-title">Recuperar Senha</h1>

        <input
          type="text"
          placeholder="E-mail"
          className="forgot-input"
        />

        <button className="forgot-button">Recuperar</button>

        <p className="forgot-message">
          Está registrado? <Link to="/login" className="forgot-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

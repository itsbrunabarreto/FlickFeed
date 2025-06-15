import { Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h1 className="signup-title">Registre sua conta</h1>

        <input type="text" placeholder="Nome" className="signup-input" />
        <input type="text" placeholder="E-mail" className="signup-input" />
        <input type="password" placeholder="Senha" className="signup-input" />
        <input type="password" placeholder="Confirme Senha" className="signup-input" />

        <button className="signup-button">Salvar</button>

        <p className="signup-message">
          Já está registrado? <Link to="/login" className="signup-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

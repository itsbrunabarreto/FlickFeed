import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../../context/ContextProvider';
import useValidator from '../../hook/useValidator';
import axiosClient from '../../axiosClient';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { _setToken, _setUser } = useLogin();

  const initialModel = { email: '', password: '' };
  const errorModel = { email: false, password: false, emailMensagem: [], passwordMensagem: [] };

  const validationRules = {
    email: (value) => {
      const erros = [];
      if (!value) erros.push('E-mail é obrigatório.');
      else if (!/\S+@\S+\.\S+/.test(value)) erros.push('Formato de e-mail inválido.');
      return erros;
    },
    password: (value) => {
      const erros = [];
      if (!value) erros.push('Senha é obrigatória.');
      else if (value.length < 6) erros.push('A senha deve ter pelo menos 6 caracteres.');
      return erros;
    }
  };

  const {
    model,
    error,
    handleChangeField,
    handleBlurField,
    formValid,
    setError
  } = useValidator(initialModel, errorModel, validationRules);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formValid()) return;

    axiosClient.post('/login', model)
      .then(({ data }) => {
        _setToken(data.token);
        _setUser(data.user);
        navigate('/dashboard');
      })
      .catch(() => {
        setError(prev => ({
          ...prev,
          emailMensagem: ['Credenciais inválidas'],
          email: true
        }));
      });
  };

  return (
    <div className="login-form-container">
      <div className="form-box">
        <form onSubmit={onSubmit}>
          <h1 className="form-title">Acesso ao Sistema</h1>

          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={model.email}
            onChange={handleChangeField}
            onBlur={handleBlurField}
            className={error.email ? 'input-error' : ''}
          />
          {error.emailMensagem.map((msg, i) => (
            <p key={i} className="error-text">{msg}</p>
          ))}

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={model.password}
            onChange={handleChangeField}
            onBlur={handleBlurField}
            className={error.password ? 'input-error' : ''}
          />
          {error.passwordMensagem.map((msg, i) => (
            <p key={i} className="error-text">{msg}</p>
          ))}

          <button type="submit" className="btn-submit">Login</button>

          <p className="form-message">Não está Registrado? <Link to="/register">Criar nova conta</Link></p>
        </form>
      </div>
    </div>
  );
}

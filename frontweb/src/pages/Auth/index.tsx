import { ReactComponent as HomeImage } from '../../assets/images/main-image.svg';
import './styles.css';
import Login from './Login';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <HomeImage />
      </div>
      <div className="auth-form-container">
        <Login />
      </div>
    </div>
  );
};

export default Auth;

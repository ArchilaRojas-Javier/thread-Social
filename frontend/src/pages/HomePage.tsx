import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './home.css';

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <span className="home-brand">Thread</span>
        <div className="home-user">
          <span className="home-username">@{user?.username}</span>
          <button className="home-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="home-main">
        <p className="home-welcome">Bienvenido, <strong>{user?.username}</strong>.</p>
        <p className="home-coming">El feed está en construcción...</p>
      </main>
    </div>
  );
}

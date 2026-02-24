import PropTypes from 'prop-types';
import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Job Portal</h1>
      <p>Welcome! MERN stack is running.</p>
      <nav>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

Placeholder.propTypes = { title: PropTypes.string.isRequired };
function Placeholder({ title }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>{title}</h2>
      <Link to="/">← Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Placeholder title="Login" />} />
      <Route path="/register" element={<Placeholder title="Register" />} />
    </Routes>
  );
}

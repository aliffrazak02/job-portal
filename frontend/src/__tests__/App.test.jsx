import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.jsx';

function renderWithRouter(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders without crashing', () => {
    renderWithRouter();
  });

  it('shows Job Portal heading on the home page', () => {
    renderWithRouter('/');
    expect(screen.getByRole('heading', { name: /job portal/i })).toBeInTheDocument();
  });

  it('shows Login and Register navigation links on the home page', () => {
    renderWithRouter('/');
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('renders Login page at /login', () => {
    renderWithRouter('/login');
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders Register page at /register', () => {
    renderWithRouter('/register');
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  it('navigating to Login shows back link to home', async () => {
    renderWithRouter('/login');
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});

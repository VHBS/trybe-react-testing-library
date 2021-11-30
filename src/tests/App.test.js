import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1 - Testa o componente App.js', () => {
  it('Testa se o primeiro link possui o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    const buttonHome = screen.getByRole('link', {
      name: /home/i });

    expect(buttonHome).toBeInTheDocument();
    userEvent.click(buttonHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se o primeiro link possui o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const buttonAbout = screen.getByRole('link', {
      name: /about/i });
    expect(buttonAbout).toBeInTheDocument();

    userEvent.click(buttonAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se o primeiro link possui o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const buttonFavoritePokémons = screen.getByRole('link', {
      name: /favorite pokémons/i });
    expect(buttonFavoritePokémons).toBeInTheDocument();

    userEvent.click(buttonFavoritePokémons);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se o primeiro link possui o texto NotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/blablabla');

    const text = screen.getByRole('heading', {
      name: /page requested not found/i });
    expect(text).toBeInTheDocument();
  });
});

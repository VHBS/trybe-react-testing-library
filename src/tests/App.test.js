import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1 - Testa o componente App.js', () => {
  it(`1.1.1 - Testa se o primeiro link possui o texto Home 
  && 1.2 - Se é redirecionado para sua URL`, () => {
    const { history } = renderWithRouter(<App />);
    const buttonHome = screen.getByRole('link', {
      name: /home/i });

    expect(buttonHome).toBeInTheDocument();
    userEvent.click(buttonHome);
    expect(history.location.pathname).toBe('/');
  });

  it(`1.1.2 - O segundo link deve possuir o texto About
  && 1.3 - Se é redirecionado para sua URL`, () => {
    const { history } = renderWithRouter(<App />);
    const buttonAbout = screen.getByRole('link', {
      name: /about/i });
    expect(buttonAbout).toBeInTheDocument();

    userEvent.click(buttonAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it(`1.1.3 - O terceiro link deve possuir o texto Favorite Pokémons
  && 1.4 - Se é redirecionado para sua URL`, () => {
    const { history } = renderWithRouter(<App />);
    const buttonFavoritePokémons = screen.getByRole('link', {
      name: /favorite pokémons/i });
    expect(buttonFavoritePokémons).toBeInTheDocument();

    userEvent.click(buttonFavoritePokémons);
    expect(history.location.pathname).toBe('/favorites');
  });

  it(`1.5 - Teste se a aplicação é redirecionada para a página 
  Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/blablabla');

    const text = screen.getByRole('heading', {
      name: /page requested not found/i });
    expect(text).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4 - Teste o componente NotFound.js', () => {
  it(`Teste se página contém um heading h2 com o texto 
  Page requested not found 😭`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/trybe');

    const text = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2 });
    expect(text).toBeInTheDocument();
  });

  it(`Teste se página mostra a imagem 
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/trybe');

    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

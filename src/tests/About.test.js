import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Requisito 2 - Testa o componente About', () => {
  it('2.2 - Teste de a página contém as informações dobre a Pokédex', () => {
    render(<About />);
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('2.3 - Teste se a página contém dois parágrafos com o texto sobre Pokédex', () => {
    render(<About />);
    const pokedexTextOne = screen.getByText(/this application simulates a pokédex/i);
    const pokedexTextTwo = screen.getByText(/one can filter pokémons by type/i);
    expect(pokedexTextOne && pokedexTextTwo).toBeInTheDocument();
  });

  it('2.4 - Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img', {
      name: /pokédex/i });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

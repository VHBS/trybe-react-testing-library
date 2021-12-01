import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Requisito 3 - Teste o componente FavoritePokemons.js', () => {
  it(`3.1 - Teste se é exibido na tela a mensagem No favorite pokemon 
  found,se a pessoa não tiver pokémons favoritos.`, () => {
    render(<FavoritePokemons />);

    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  it('3.2 - Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const POKEMONS_LENGTH = 9;

    history.push('/pokemons/25');
    const favoriteCheckBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i });
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/4');
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/10');
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/23');
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/65');
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/151');
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/78');
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/143');
    userEvent.click(favoriteCheckBox);

    history.push('/pokemons/148');
    userEvent.click(favoriteCheckBox);

    history.push('/favorites');
    const pokemonsNames = screen.getAllByTestId('pokemon-name');
    expect(pokemonsNames).toHaveLength(POKEMONS_LENGTH);
  });
});

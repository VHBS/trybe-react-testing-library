import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6 - Teste o componente Pokemon.js', () => {
  it(`6.1 - Teste se é renderizado um card com as informações 
  de determinado pokémon.`, () => {
    renderWithRouter(<App />);

    // 6.1.1 - O nome correto do Pokémon deve ser mostrado na tela
    const pokeName = screen.getByTestId('pokemon-name').textContent;
    expect(pokeName === 'Pikachu').toBeTruthy();

    // 6.1.2 - O tipo correto do pokémon deve ser mostrado na tela
    const pokeType = screen.getByTestId('pokemon-type').textContent;
    expect(pokeType === 'Electric').toBeTruthy();

    // 6.1.3 - O peso médio correto do pokemón deve ser mostrado na tela
    const pokeWeight = screen.getByTestId('pokemon-weight').textContent;
    expect(pokeWeight === 'Average weight: 6.0 kg').toBeTruthy();

    // 6.1.4 - A imagem correta do pokémon deve ser mostrada na tela
    const pokeImg = screen.getByAltText('Pikachu sprite');
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg).toHaveAttribute('alt', `${pokeName} sprite`);
  });

  it(`6.2 - Teste se o card do Pokémon indicado na Pokédex contém um link de 
  navegação para exibir detalhes deste Pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);

    const datails = screen.getByText('More details');
    expect(datails).toHaveAttribute('href', '/pokemons/25');
  });

  it(`6.3 - Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('6.4 - Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name').textContent;

    const pokeDetails = screen.getByRole('link', {
      name: /more details/i });
    userEvent.click(pokeDetails);
    const pokeCheckFavorites = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i });
    userEvent.click(pokeCheckFavorites);
    const favoritedImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i });
    expect(favoritedImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoritedImg).toHaveAttribute('alt', `${pokeName} is marked as favorite`);
  });
});

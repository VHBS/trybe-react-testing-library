import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('7 - Teste o componente <PokemonDetails.js />', () => {
  it(`7.1 - Teste se as informações detalhadas do
  Pokémon selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    const buttonMoreDetails = screen.getByRole('link', {
      name: /more details/i });
    userEvent.click(buttonMoreDetails);
    const detailsText = screen.getByRole('heading', {
      name: /pikachu details/i });

    // 7.1.1 - A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    expect(detailsText).toBeInTheDocument();

    // 7.1.2 - Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(buttonMoreDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    // 7.1.3 - A seção de detalhes deve conter um heading h2 com o texto Summary.
    expect(summary).toBeInTheDocument();
    const pokeDetails = screen.getByText(/this intelligent pokémon roasts hard/i);

    // 7.1.4 - A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    expect(pokeDetails).toBeInTheDocument();
  });

  it(`7.2 - Teste se existe na página uma seção com os
  mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    const buttonMoreDetails = screen.getByRole('link', {
      name: /more details/i });
    userEvent.click(buttonMoreDetails);

    // 7.2.1 - Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const pokeLocationsTitle = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2 });
    expect(pokeLocationsTitle).toBeInTheDocument();

    // 7.2.2 - Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const locationImg = screen.getAllByAltText('Pikachu location');
    expect(locationImg).toHaveLength(2);

    // 7.2.3 - Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const locationOne = screen.getByText(/kanto viridian forest/i);
    const locationTwo = screen.getByText(/kanto power plant/i);
    expect(locationOne && locationTwo).toBeInTheDocument();

    // 7.2.4 - A imagem da localização deve ter um atributo src com a URL da localização;
    const urlOne = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const urlTwo = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    locationImg.forEach((img) => expect(img.src === urlOne
      || img.src === urlTwo).toBeTruthy());

    // 7.2.5 - A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    expect(locationImg).toBeTruthy();
  });

  it(`7.3 - Teste se o usuário pode favoritar um pokémon
  através da página de detalhes`, () => {
    renderWithRouter(<App />);

    const buttonMoreDetails = screen.getByRole('link', {
      name: /more details/i });
    userEvent.click(buttonMoreDetails);

    // 7.3.1 - A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkBoxFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i });
    expect(checkBoxFavorite).toBeInTheDocument();

    // 7.3.2 - Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(checkBoxFavorite);

    // 7.3.3 - O label do checkbox deve conter o texto Pokémon favoritado?
    const pokeFavorited = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i });

    expect(pokeFavorited).toBeInTheDocument();
    userEvent.click(checkBoxFavorite);
    expect(pokeFavorited).not.toBeInTheDocument();
  });
});

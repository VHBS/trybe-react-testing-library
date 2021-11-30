import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
// import { Pokedex } from '../components';

describe('Requisito - 5. Teste o componente Pokedex.js', () => {
  const pokeName = 'pokemon-name';
  const pokeType = 'pokemon-type';

  const pokemonsTypesButton = (param) => pokemons
    .reduce((acc, curr) => (curr.type === param
      ? [...acc, curr.type] : acc), []);

  it(`5.1 - Teste se página contém um heading 
  h2 com o texto Encountered pokémons.`, () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2 });
    expect(title).toBeInTheDocument();
  });

  it(`5.2 - Teste se é exibido o próximo Pokémon da lista 
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);

    // 5.2.1 - O botão deve conter o texto 'Próximo pokémon'
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i });
    userEvent.click(buttonNextPokemon);

    const pikachuOne = screen.getByTestId(pokeName).textContent;

    // 5.2.2 - Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    pokemons.forEach(() => {
      const firstPokemon = screen.getByTestId(pokeName).textContent;

      expect(firstPokemon).toBeTruthy(); // 5.6 Verificar se o teste faz sentido.

      userEvent.click(buttonNextPokemon);
      const secondPokemon = screen.getByTestId(pokeName).textContent;

      expect(firstPokemon === secondPokemon).toBeFalsy();
    });
    const pikachuTwo = screen.getByTestId(pokeName).textContent;

    // 5.2.3 - Verifica se o primeiro da lista reaparece quando acaba os pokemóns
    expect(pikachuOne === pikachuTwo).toBeTruthy();
  });

  it('5.3 - Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    pokemons.forEach(() => {
      const firstPokemon = screen.getByTestId(pokeName).textContent;
      expect(firstPokemon).toBeTruthy();

      const buttonNextPokemon = screen.getByRole('button', {
        name: /próximo pokémon/i });
      userEvent.click(buttonNextPokemon);
    });
  });

  it('5.4 - Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    // 5.4.1 - Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const buttonTypePokemon = screen.getAllByTestId('pokemon-type-button');

    buttonTypePokemon.forEach((type, index) => {
      const pokeTypeName = type.textContent;
      if (buttonTypePokemon[index - 1]) {
        const beforePokeType = buttonTypePokemon[index - 1].textContent;
        expect(pokeTypeName !== beforePokeType);
      }
    });

    // 5.4.2 - A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    buttonTypePokemon.forEach((type) => { // Percorre todos os button-types
      const typeQuantity = pokemonsTypesButton(type.textContent); // Quantidade de pokemons de cada tipo

      const buttonAll = screen.getByRole('button', {
        name: /all/i });

      expect(buttonAll).toBeInTheDocument(); // 5.4.4 - Testa se o button All está presente

      const buttonType = screen.getByRole('button', { // Resgata os botões de forma dinâmica
        name: `${type.textContent}` });
      userEvent.click(buttonType);

      typeQuantity.forEach(() => {
        expect(buttonAll).toBeInTheDocument(); // 5.4.4 - Testa se o button All está presente

        const getNextPoke = screen.getByTestId('next-pokemon');
        userEvent.click(getNextPoke);
        const getTestIdType = screen.getByTestId(pokeType).textContent;
        expect(getTestIdType === buttonType.textContent).toBeTruthy();
      });
    });
  });

  it('5.5 - Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i });

    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const firstPokemon = screen.getByTestId(pokeName);
    expect(firstPokemon).toHaveTextContent('Pikachu');
  });
});

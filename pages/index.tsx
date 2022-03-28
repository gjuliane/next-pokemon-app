// import { Button } from '@nextui-org/react'
import { NextPage, GetStaticProps } from 'next'
import { Grid} from '@nextui-org/react';

import { Layout } from '../components/layouts'
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

import { PokemonCard } from '../components/pokemon/PokemonCard';

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  // console.log(props);
  // console.log(pokemons);
  
  return (
    <Layout title='Listado de Pokémons'>
      {/* <Button color="gradient">Hola mundo</Button> */}
      <Grid.Container gap={2} justify='flex-start'>
        {
          // pokemons.map( (pokemon, i) => (
          pokemons.map( (pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}></PokemonCard>
          ))
        }
      </Grid.Container>

    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here 
  console.log('hola mundo /index.tsx');
  // se ejeuta del lado del server en el momento del build time

  // const resp = await pokeApi.get('/pokemon?limit=151')
  // console.log(resp.data);
  
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=500')
  // console.log(data);
  
  const pokemons: SmallPokemon[] = data.results.map((result, i) => ({
    ...result,
    id: i+1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }))

  // data.results.forEach( (result, id) => {
  //   const pokemon: SmallPokemon = {
  //     ...result,
  //     id,
  //     image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  //   };
  //   console.log(pokemon)
  //   pokemons.push(pokemon);
  // });


  // Solo las props llegan al cliente
  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage

import { useRouter } from 'next/router';
import React from 'react'
import { Layout } from '../../components/layouts/Layout';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import pokeApi from '../../api/pokeApi';
import { Pokemon } from '../../interfaces';
import { Card, Grid, Text, Button, Container } from '@nextui-org/react';
import Image from 'next/image';

interface Props {
  pokemon: Pokemon
}

export const PokemonPage: NextPage<Props> = ({pokemon}) => {
  const router = useRouter();
  console.log(router.query);
  // console.log(pokemon);
  
  return (
    <Layout title='Algún Pokemon'>
        <Grid.Container css={{marginTop: '5px'}} gap={2}>
          <Grid xs={12} sm={4}>
            <Card hoverable css={{padding: '30px'}}>
              <Card.Body>
                <Card.Image
                  src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={pokemon.name}
                  width="100%"
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{display: 'flex', justifyContent:'space-between'}}>
                <Text h1>{pokemon.name}</Text>
                <Button color="gradient" ghost>Guardar en favoritos</Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container display='flex' direction='row'>
                  <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/>
                  <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}/>
                  <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}/>
                  <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}/>
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}

// getStaticPaths solo se ejecuta en el build
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await  // your fetch function here 

  // Generando arreglo para los paths de los 151 pokémons
  const pokemon151 = [...Array(151)].map( (value, i) => `${i+1}` )


  return {
    // paths: [
    //   {
    //     params: { id: '1'}
    //   },
    //   {
    //     params: { id: '2'}
    //   },
    //   {
    //     params: { id: '3'}
    //   }
    // ],
    // fallback: "blocking" // deja pasar
    paths: pokemon151.map( (id) => ({
      params: {id}
    })),
    fallback: false // regresa 404
  }
}

// desestructuramos el Context ctx
// export const getStaticProps: GetStaticProps = async (ctx) => {
export const getStaticProps: GetStaticProps = async ({params}) => {
  // se ejeuta del lado del server en el momento del build time
  // const { data } = await  // your fetch function here 
  console.log('hola mundo /pokemon/index.tsx');
  
  const {id} = params as {id: string}
  
  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`);


  // Solo las props llegan al cliente
  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonPage
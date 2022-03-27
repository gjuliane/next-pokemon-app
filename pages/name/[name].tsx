import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Pokemon, PokemonByNameResponse } from '../../interfaces';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { Layout } from '../../components/layouts';
import { Card, Grid, Text, Button, Container, Image, Spacer } from '@nextui-org/react';
import { pokeApi } from '../../api';
import { getPokemonInfo } from '../../utils/getPokemonInfo';
import { redirect } from 'next/dist/server/api-utils';


interface Props {
    pokemon: Pokemon
}

export const PokemonByNamePage:NextPage<Props> = ({pokemon}) => {
    const router = useRouter();
    console.log(router.query);
    // console.log(pokemon);
  
    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
    // console.log(isInFavorites);
    
  
    const onToggleFavorite = () => {
      console.log('ID:', pokemon.id);
      localFavorites.toggleFavorite(pokemon.id)
      setIsInFavorites(!isInFavorites)
  
      if (!isInFavorites) {
        confetti({
          zIndex: 999,
          particleCount:100,
          spread: 160,
          angle: -100,
          origin: {
            x:0.5,
            y:0.0
          }
        })
      }
    }
  
    useEffect(() => {
      console.log("useEffect")
    }, [])
    
    
    return (
      <Layout title={pokemon.name}>
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
                {/* <Card.Header css={{display: 'flex', justifyContent:'space-between'}}> */}
                <Card.Header>
                  <Grid xs={12} sm={12} css={{flexWrap:'wrap', justifyContent:'space-between', alignItems:'center'}}>
                    <Text h1>{pokemon.name}</Text>
                    <Button
                      color="gradient"
                      ghost={!isInFavorites}
                      onClick={onToggleFavorite}
                      >{isInFavorites? 'En favoritos':'Guardar en favoritos'}</Button>
                  </Grid>
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
    // const pokemon151 = [...Array(151)].map( (value, i) => `${i+1}` )

    // const {data} = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
    const { data } = await pokeApi.get<PokemonByNameResponse>(`/pokemon?limit=151`)

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
        paths: data.results.map( (pokemon) => ({
            params: {name: pokemon.name}
        })),
        // fallback: false // regresa 404
        fallback: 'blocking'
    }
}

// desestructuramos el Context ctx
// export const getStaticProps: GetStaticProps = async (ctx) => {
export const getStaticProps: GetStaticProps = async ({params}) => {
    // se ejeuta del lado del server en el momento del build time
    // const { data } = await  // your fetch function here 
    // console.log('hola mundo /pokemon/index.tsx');

    const {name} = params as {name: string}

    // const {data} = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

    // const pokemon = {
    //   id: data.id,
    //   name: data.name,
    //   sprites: data.sprites
    // }

    // // Solo las props llegan al cliente
    // return {
    //     props: {
    //         pokemon
    //     }
    // }

    // Factorizado
    // return {
    //   props: {
    //     pokemon: await getPokemonInfo(name)
    //   }
    // }

    // Incremental Side Rendering
    const pokemon = await getPokemonInfo(name)
    if (!pokemon) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return {
      props: {
        pokemon
      }
    }
}
  
export default PokemonByNamePage
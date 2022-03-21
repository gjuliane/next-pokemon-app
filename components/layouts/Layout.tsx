import { FC } from 'react';

import Head from 'next/head';
import { Navbar } from '../ui/Navbar';

interface Props {
  title: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title> {title || "PokemonApp"}</title>
        <meta name='author' content="Gustavo Julián" />
        <meta name='description' content={`Información sobre el pokémon ${title}`} />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
      </Head>

      <Navbar></Navbar>

      <main style={{
        padding: '0px 20px'
      }}>
        { children }
      </main>
    </>
  )
}

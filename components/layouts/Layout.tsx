import { FC } from 'react';

import Head from 'next/head';
import { Navbar } from '../ui/Navbar';

interface Props {
  title: string;
}

const origin = (typeof window === 'undefined')?'': window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

  if (origin) {

  }


  return (
    <>
      <Head>
        <title> {title || "PokemonApp"}</title>
        <meta name='author' content="Gustavo Julián" />
        <meta name='description' content={`Información sobre el pokémon ${title}`} />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Esta la información sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`}/>
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

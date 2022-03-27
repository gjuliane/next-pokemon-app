
import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui/NoFavorites';
import { useEffect, useState } from 'react';
import { localFavorites } from '../../utils';
import { NextPage } from 'next';
import { FavoritePokemons } from '../../components/pokemon/FavoritePokemons';

const FavoritesPage:NextPage = () => {
  
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  // Se ejecutará cuando la página es creada
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])
  

  return (
    <Layout title='Pokemons - Favoritos'>
      {
        favoritePokemons.length === 0
          ? (
            <NoFavorites></NoFavorites>
          ): (
            <FavoritePokemons pokemons={favoritePokemons} />
          )
      }
    </Layout>
  )
}

export default FavoritesPage
const toggleFavorite = (id: number) => {
    console.log("ToggleFavorites Llamado");
    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' )
    
    if (favorites.includes(id)) {
        favorites = favorites.filter( pokeId => pokeId !== id)
    } else {
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existInFavorites = (id: number): boolean => {
    if (typeof localStorage === 'undefined') {
        return false
    }
    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' )
    return favorites.includes(id)
}

const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    existInFavorites,
    toggleFavorite,
    pokemons
}
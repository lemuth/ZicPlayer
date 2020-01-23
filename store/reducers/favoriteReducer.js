


const initialState = { favoritesFilm: [] };

function toggleFavorite ( state = initialState, action ) {

    let nextState;

    switch ( action.type ) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex( item => 
                item.id === action.value.id);
            if ( favoriteFilmIndex !== -1 ) {
                // Le film est déjà dans le favoris, on le supprime de la liste
                nextState = { 
                    ...state, // on copie le state, pas obligatoire mais bonne pratique
                     favoritesFilm: state.favoritesFilm.filter( (item, index)  => index !== favoriteFilmIndex )
                };
            } else {
                nextState = {
                    ...state, // on copie le state, pas obligatoire mais bonne pratique
                    favoritesFilm: [ ...state.favoritesFilm, action.value ]

                };
            }
            return nextState||state; // On renvoi nextstate, si il est undefined, on renvoi le state.
        default:
            return state;
    }
}

export default toggleFavorite;
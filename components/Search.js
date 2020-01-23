import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import getFilmsFromApiWithSearchedText from '../apis/tmdb';
import FilmItem from './FilmItem';
import FilmList from './FilmList';

class Search extends Component {

    constructor(props) {
        super(props);
        this.searchedText = "",
        this.page = 0,
        this.totalPage = 0,
        this.state = { 
            films: [],
            isLoading: false
        };
    }

    _loadFilms() {
        if ( this.searchedText.length > 0 ) {
            this.setState( {isLoading: true} );
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then( data => {
                this.page = data.page,
                this.totalPages = data.total_pages,
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                });
            } );
        }
    }

    _searchedTextInputChanged(text) {
        this.searchedText = text;
    }

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
          films: []
        }, () => { 
            this._loadFilms();
        });
    }

    _displayLoading() {
        if( this.state.isLoading ) {
            return (
                <View style = { styles.loading_container }>
                    <ActivityIndicator size = 'large' />
                </View>
            )
        }
    }

    render () {
        return (
            <View
                style={ styles.main_container }>
                    
                <TextInput
                    style={ styles.textinput }
                    placeholder='Titre du film'
                    onChangeText = { (text) => this._searchedTextInputChanged(text)}
                    onSubmitEditing = { () => this._searchFilms() }
                />
                <Button
                    title='Rechercher'
                    onPress={ () => this._searchFilms()}
                />
                {/* pour changer la taille de  FlatList , il faut l'encapsuler dans une  View. Sinon, par défaut, elle prendra toute la place disponible. */}
                <FilmList
                    films = { this.state.films }
                    navigation = { this.props.navigation }
                    loadFilms = { this._loadFilms }
                    page = { this.page }
                    totalPages = { this.totalPages }
                />
                { this._displayLoading() }
            </View>
        );
    }   
}

const styles = StyleSheet.create({

    main_container: {
        flex: 1
    },

    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
      },

      loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default Search;
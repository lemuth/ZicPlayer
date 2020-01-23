import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Image, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { getFilmDetailFromApi, getImageFromApi } from '../apis/tmdb';


class FilmDetail extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true
    };
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      });
    });
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  }

  _displayFavoriteImage() {
      var sourceImage = require('../Images/ic_favorite_border.png')
      if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
        // Film dans nos favoris
        sourceImage = require('../Images/ic_favorite.png')
      }
      return (
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      )
  }

  _displayFilm() {

    const { film } = this.state;

    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
              style = { styles.poster }
              source = {{ uri: getImageFromApi( film.poster_path ) }}
          />
          <Text style = { styles.title }> { film.title } </Text>
          <TouchableOpacity
            style = { styles.favorites_container }
            onPress = { () => this._toggleFavorite()  }
          >
            { this._displayFavoriteImage() }
          </TouchableOpacity>

          <Text style = { styles.textContent }>Date de sortie: { film.release_date }</Text>
          <Text style = { styles.textContent }>Genres:  { film.genres.map( function(genre){
                return genre.name;
            }).join( "/" ) }
          </Text>
          <Text style = { styles.overview }> { film.overview } </Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  poster: {
      height: 200,
      margin: 10
  },
  title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: "center",
    },
    overview: {
        margin: 5
    },
    textContent: {
        fontWeight: 'bold',
        margin: 5
        
    },
    favorites_container: {
      alignItems: 'center'
    },
    favorites_image: {
      width: 40,
      height: 40
    }
})


// Ici on connecte le state de l'app avec les props de FilmDetail
const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
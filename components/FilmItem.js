import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { getImageFromApi } from '../apis/tmdb';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class FilmItem extends Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            return (
                <Image
                    style = { styles.favorite_image }
                    source = { require( '../Images/ic_favorite.png' ) }
                />
            )
        }
    }

    render() {

        const { film, displayDetailForFilm } = this.props;

        return (
            <TouchableOpacity
                style = { styles.main }
                onPress = { () => displayDetailForFilm( film.id ) }    
            >

                <Image 
                    style = {styles.affiche}
                    source = {{ uri: getImageFromApi(film.poster_path) }}
                />

                <View style = {{flex: 3, flexDirection: "column", paddingLeft:5 }}>
                    <View style = {{flex: 1, flexDirection: "row"}}>
                        { this._displayFavoriteImage() }
                        <Text style = { styles.title }>{ film.title }</Text>
                        <Text style={ styles.vote }>{ film.vote_average }</Text>
                    </View>
                    <Text style = { styles.description } numberOfLines = {5} >{ film.overview }</Text>
                    <Text style={ styles.date }>Sorti le: { film.release_date }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: 190,
        // flex: 1,
        flexDirection: "row",
        margin: 5,
    },
    affiche: {
        flex: 1,
        backgroundColor: "grey"
    },
    title: {
        flex: 2,
        flexWrap: 'wrap',
        fontWeight: "bold",
        fontSize: 20
    },
    description: {
        flex: 2,
        color: "grey"
    },
    vote: {
        flex:1,
        textAlign: "right",
        paddingRight: 5,
        fontWeight: "bold",
        fontSize: 20,
        color: "grey"
    },
    date: {
        flex: 1,
        alignSelf: "flex-end"
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }

});
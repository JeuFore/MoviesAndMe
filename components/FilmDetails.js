import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getFilmDetail, getImageApi } from '../api/TMDBApi'
import { connect } from 'react-redux'

class FilmDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            getStatusDetailFilm: true,
            film: undefined
        }
    }

    componentDidMount() {

        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) {
          this.setState({
            film: this.props.favoritesFilm[favoriteFilmIndex],
            getStatusDetailFilm: false
          })
          return
        }

        getFilmDetail(this.props.navigation.state.params.idFilm)
            .then(data => {
                this.setState({
                    film: data,
                    getStatusDetailFilm: false
                })
            })
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayLoading() {
        if (this.state.getStatusDetailFilm) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayFavoriteImage() {
        var sourceImage = require('../assets/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../assets/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageApi(this.state.film.backdrop_path) }}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.title_text}>{this.state.film.title}</Text>
                        <TouchableOpacity
                            style={styles.favorite_container}
                            onPress={() => this._toggleFavorite()}>
                            {this._displayFavoriteImage()}
                        </TouchableOpacity>
                        <Text style={styles.text_overview}>{this.state.film.overview}</Text>
                        <Text style={styles.text_sup}>Sorti le {this.state.film.release_date}</Text>
                        <Text style={styles.text_sup}>Note : {this.state.film.vote_average} / 10</Text>
                        <Text style={styles.text_sup}>Nombre de votes : {this.state.film.vote_count}</Text>
                        <Text style={styles.text_sup}>Budget : {this.state.film.budget} $</Text>
                        <Text style={styles.text_sup}>Genre(s) : {this.state.film.genres.map((genres) => genres.name).join(" / ")}</Text>
                        <Text style={styles.text_sup}>Companie(s) : {this.state.film.production_companies.map((company) =>
                            company.name
                        ).join(" / ")}</Text>
                    </View>
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
    image: {
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    title_text: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 15
    },
    text_container: {
        margin: 10
    },
    text_overview: {
        fontSize: 17,
        color: 'gray',
        marginBottom: 15
    },
    text_sup: {
        fontSize: 17,
        marginBottom: 5
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetails)
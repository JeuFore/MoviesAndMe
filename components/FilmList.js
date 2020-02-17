import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import FilmItem from './FilmItem'

class FilmList extends React.Component{

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetails", { idFilm: idFilm })
    }

    render(){
        return(
            <FlatList
            data={this.props.films}
            extraData={this.props.favoritesFilm}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FilmItem data={item} displayDetailForFilm={this._displayDetailForFilm} isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} />}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
                    this.props.loadFilms()
                }
            }}
        />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)
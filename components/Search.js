import React from 'react'
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../api/TMDBApi'
import filmsData from '../helpers/filmsData'
import FilmList from './FilmList'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            requestStatus: false,
        }
        this.changeText = ""
        this.page = 0
        this.totalPages = 0
        this._loadFilms = this._loadFilms.bind(this)
    }

    searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({ films: [] })
        this._loadFilms()
    }

    _loadFilms() {
        if (this.changeText.length > 0) {
            this.setState({ requestStatus: true })
            getFilmsFromApiWithSearchedText(this.changeText, this.page + 1)
                .then(data => {
                    this.totalPages = data.total_pages
                    this.setState({
                        films: [...this.state.films, ...data.results],
                        requestStatus: false
                    })
                });
            this.page++
        }
    }

    _loadFilms1() {
        this.setState({
            requestStatus: false,
            films: [...this.state.films, ...filmsData],
        })
        this.totalPages = 1
        this.page++
    }

    render() {
        return (
            <View style={styles.main}>
                <TextInput
                    placeholder='Titre du film'
                    style={styles.textinput}
                    onChangeText={(text) => this.changeText = text}
                    onSubmitEditing={() => this.searchFilms()}
                />
                <Button title='Rechercher' onPress={() => this.searchFilms()} />
                {this.state.requestStatus === true && (
                    <View style={styles.loading_container}>
                        <ActivityIndicator size='large' />
                    </View>
                )
                }
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#273036',
        flex: 1
    },
    textinput: {
        margin: 15,
        padding: 15,
        borderColor: '#0099FF',
        borderRadius: 50,
        borderWidth: 4,
        borderStyle: 'solid',
        color: 'white'
    },
    filmItem: {
        margin: 15
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
})

export default Search
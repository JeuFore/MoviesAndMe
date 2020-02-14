import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native'
import films from '../helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApi } from '../api/TMDBApi'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this._films = []
    }

    _loadFilms() {
        const test = getFilmsFromApi("Stars Wars");
        console.log(test.results)
    }
    render() {
        return (
            <View style={styles.main}>
                <TextInput placeholder='Titre du film' style={styles.textinput} />
                <Button title='Rechercher' onPress={() => this._loadFilms()} />
                <FlatList
                    data={this._films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem data={item} />}
                    style={styles.filmItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 24,
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
    }
})

export default Search
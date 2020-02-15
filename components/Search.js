import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApi, getFilmsFromApiWithSearchedText } from '../api/TMDBApi'

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
    }

    searchFilms(){
        this.page = 0
        this.totalPages = 0
        this.setState({ films: []})
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
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem data={item} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
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
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search
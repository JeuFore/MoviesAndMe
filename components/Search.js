import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native'
import films from '../helpers/filmsData'

class Search extends React.Component {
    render() {
        return (
            <View style={styles.view}>
                <TextInput placeholder='Titre du film' style={styles.textinput} />
                <Button title='Rechercher' onPress={() => { }} />
                <FlatList
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
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
    text: {
        color: 'white'
    }
})

export default Search
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageApi } from '../api/TMDBApi'

class FilmItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.main_container} onPress={() => this.props.displayDetailForFilm(this.props.data.id)}>
                <Image
                    style={styles.image}
                    source={{ uri: getImageApi(this.props.data.poster_path) }}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this.props.isFilmFavorite && (
                            <Image source={require('../assets/ic_favorite.png')} style={{height: 40, width: 40, marginRight: 5}}/>
                        )}
                        <Text style={styles.title_text}>{this.props.data.title}</Text>
                        <Text style={styles.vote_text}>{this.props.data.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{this.props.data.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {this.props.data.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        minHeight: 190,
        flexDirection: 'row',
        backgroundColor: '#F3F4F5',
        margin: 15
    },
    image: {
        width: 120,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default FilmItem
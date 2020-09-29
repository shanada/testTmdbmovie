import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView, FlatList, Image } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import { fs } from '../../../components/common/fontSizeData'
import { cd } from '../../../components/common/colorData'
import { Label } from '../../../components/common/label'
import Ripple from 'react-native-material-ripple'
import FastImage from 'react-native-fast-image'

class MainMovies extends PureComponent {
    constructor(props) {
        super(props);
        const { data } = this.props.navigation.state.params
        this.state = {
            isLoadingList: false,
            dataAll: data

        }
        console.warn(this.state.dataAll)
    }



    render() {
        const { dataAll, } = this.state
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <ScrollView style={styles.listArea}>
                        <View style={styles.listContent}>
                            <View>
                                <FlatList
                                    numColumns={2}
                                    data={dataAll}
                                    renderItem={this._renderMenu}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.flatlistArea}
                                    keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    _renderMenu = ({ item }) => {
        let id = item.id
        let title = item.original_title
        let path = item.poster_path
        let img = item.img
        const { navigate } = this.props.navigation
        return (
            <Ripple
                style={styles.menuArea}
                onPress={() => navigate('MainDetailTV', { data: id })}>
                <View style={styles.menuImg}>
                    <FastImage source={{ uri: "https://image.tmdb.org/t/p/w500/" + path }} style={styles.menuImg} resizeMode={'contain'} />
                </View>
            </Ripple>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetLoader: (isLoading, loaderMessage) => {
            dispatch(
                onSetLoader(isLoading, loaderMessage)
            )
        },
        onSetLoggedIn: (isLoggedIn, token) => {
            dispatch(
                onSetLoggedIn(isLoggedIn, token)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMovies)
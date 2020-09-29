import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView, FlatList, ActivityIndicator, TextInput, Text } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import HeaderNavigation from '../../../components/common/headerNavigation';
import { fs } from '../../../components/common/fontSizeData'
import { cd } from '../../../components/common/colorData'
import { Label } from '../../../components/common/label'
import Ripple from 'react-native-material-ripple'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'


class MainMovies extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () =>
                <HeaderNavigation
                    navigation={navigation}
                    isMovies
                />
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchData: [],
            query: '',
            typingTimeout: 0
        }
    }

    componentDidMount = async () => {
    }


    search = (text) => {
        const self = this;

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            query: text.toLowerCase(),
            typing: false,
            typingTimeout: setTimeout(function () {
                self.search1()
            }, 1000)
        });
    }

    search1 = () => {
        const { query } = this.state
        let text = query
        if (text !== '') {
            this.setState({
                isLoading: true
            })
            const { accessToken } = this.props
            let url = 'onSearchMovies'
            let body = {
                "api_key": "1e614e28e3e30ee282026592fec6431c",
                query: text
            }
            timeoutService(60000, getService(url, body)).then((response) => {
                console.warn(response)
                try {
                    if (response.page == 1) {
                        let searchData = response.results
                        this.setState({
                            searchData,
                            isLoading: false,
                        })
                    } else {
                        this.setState({
                            isLoading: false
                        })
                    }
                } catch (error) {
                    this.setState({
                        isLoading: false
                    })
                }
            }).catch((error) => {
                this.setState({
                    isLoading: false
                })
                rtoHandlingService()
            })
        }
    }

    _renderLoading = () => {
        const { isLoading } = this.state
        if (isLoading) {
            return (
                <View style={styles.emptyStateContent}>
                    <ActivityIndicator size="large" color={cd.primary} />
                </View>
            )
        }
    }


    render() {
        const { searchData, query } = this.state
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <ScrollView style={styles.listArea}>
                        {this._renderLoading()}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ alignItems: 'center', width: '90%', justifyContent: 'center' }}>
                                <TextInput
                                    style={{ backgroundColor: '#eaeaea', height: 40, width: '100%', paddingLeft: 12, paddingRight: 12, borderRadius: 10 }}
                                    placeholder="Search Movie"
                                    value={query}
                                    onChangeText={(text) => this.search(text)}
                                />
                            </View>
                            <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ paddingTop: 0 }}>
                                    <Ionicons name="md-search"
                                        onPress={() => this.search1(query)}
                                        style={{
                                            fontSize: 28,
                                            alignSelf: 'center',
                                            color: Platform.OS === 'ios' ? '#98C23C' : '#98C23C',
                                            // marginTop: responsiveHeight(0.9)
                                        }} />
                                </View>
                            </View>
                        </View>
                        {this._renderSearchView()}
                    </ScrollView>
                </View>
            </View >
        );
    }

    _renderSearchView() {
        const { searchData, query } = this.state
        return (
            <View>
                <FlatList
                    numColumns={2}
                    data={searchData}
                    renderItem={this._renderMenu}
                    // ListEmptyComponent={this._ListEmptyComponent()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatlistArea}
                    keyExtractor={(item, index) => index.toString()} />
            </View>
        )
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
                onPress={() => navigate('MainDetail', { data: id })}>
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
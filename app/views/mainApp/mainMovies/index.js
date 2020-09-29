import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView, FlatList, ActivityIndicator, TextInput } from 'react-native';
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
            topRatedData: [],
            upComingData: [],
            popularData: []
        }
    }

    componentDidMount = async () => {
        this._onTopRatedGet()
        this._onUpComingGet()
        this._onPopularGet()
    }

    _onTopRatedGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        let url = 'topRatedMoviesGet'
        let body = {
            "api_key": "1e614e28e3e30ee282026592fec6431c"
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.page == 1) {
                    let topRatedData = response.results
                    this.setState({
                        topRatedData,
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

    _onUpComingGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        let url = 'upComingMoviesGet'
        let body = {
            "api_key": "1e614e28e3e30ee282026592fec6431c"
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.results) {
                    let upComingData = response.results
                    this.setState({
                        upComingData,
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

    _onPopularGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        let url = 'popularMoviesGet'
        let body = {
            "api_key": "1e614e28e3e30ee282026592fec6431c"
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.page == 1) {
                    let popularData = response.results
                    this.setState({
                        popularData,
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
        const { topRatedData, upComingData, popularData } = this.state
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <ScrollView style={styles.listArea}>
                        {this._renderLoading()}
                        <Ripple
                            rippleColor="FFF"
                            onPress={() => navigate('SearchMovies')}
                            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ alignItems: 'center', width: '90%', justifyContent: 'center' }}>
                                <TextInput
                                    style={{ backgroundColor: '#eaeaea', height: 40, width: '100%', paddingLeft: 12, paddingRight: 12, borderRadius: 10 }}
                                    placeholder="Search Movie"
                                    // value={query}
                                    // onChangeText={(text) => this.search(text)}
                                    // autoFocus
                                />
                            </View>
                            <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ paddingTop: 0 }}>
                                    <Ionicons name="md-search"
                                        // onPress={() => this.search1(query)}
                                        style={{
                                            fontSize: 28,
                                            alignSelf: 'center',
                                            color: Platform.OS === 'ios' ? '#98C23C' : '#98C23C',
                                            // marginTop: responsiveHeight(0.9)
                                        }} />
                                </View>
                            </View>
                        </Ripple>
                        <View style={styles.listContent}>
                            <View style={styles.menuLabelArea}>
                                <Label
                                    text={'Top Rated'}
                                    size={fs.xxl}
                                    lines={2}
                                    align={'center'}
                                    color={cd.primary}
                                    fontWeight={'bold'} />
                                <Ripple
                                    rippleColor={cd.title}
                                    onPress={() => navigate('MainViewAll', { data: topRatedData })}>
                                    <Label
                                        text={'lihat semua'}
                                        size={fs.lg}
                                        lines={2}
                                        align={'center'}
                                        color={cd.secondary} />
                                </Ripple>
                            </View>
                            <View>
                                <FlatList
                                    horizontal={true}
                                    data={topRatedData.slice(0, 10)}
                                    renderItem={this._renderMenu}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.flatlistArea}
                                    keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>

                        <View style={styles.listContent}>
                            <View style={styles.menuLabelArea}>
                                <Label
                                    text={'Up Coming'}
                                    size={fs.xxl}
                                    lines={2}
                                    align={'center'}
                                    color={cd.primary}
                                    fontWeight={'bold'} />
                                <Ripple
                                    rippleColor={cd.title}
                                    onPress={() => navigate('MainViewAll', { data: upComingData })}>
                                    <Label
                                        text={'lihat semua'}
                                        size={fs.lg}
                                        lines={2}
                                        align={'center'}
                                        color={cd.secondary} />
                                </Ripple>
                            </View>
                            <View>
                                <FlatList
                                    horizontal={true}
                                    data={upComingData.slice(0, 10)}
                                    renderItem={this._renderMenu}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.flatlistArea}
                                    keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>

                        <View style={styles.listContent}>
                            <View style={styles.menuLabelArea}>
                                <Label
                                    text={'Popular'}
                                    size={fs.xxl}
                                    lines={2}
                                    align={'center'}
                                    color={cd.primary}
                                    fontWeight={'bold'} />
                                <Ripple
                                    rippleColor={cd.title}
                                    onPress={() => navigate('MainViewAll', { data: popularData })}>
                                    <Label
                                        text={'lihat semua'}
                                        size={fs.lg}
                                        lines={2}
                                        align={'center'}
                                        color={cd.secondary} />
                                </Ripple>
                            </View>
                            <View>
                                <FlatList
                                    horizontal={true}
                                    data={popularData.slice(0, 10)}
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
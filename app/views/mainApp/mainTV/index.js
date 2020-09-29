import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
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

class MainTV extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () =>
                <HeaderNavigation
                    navigation={navigation}
                    isTv
                />
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            topRatedTvData: [],
            popularTvData: [],
            onTheAirData: []
        }
    }

    componentDidMount = async () => {
        this._onTopRatedTvGet()
        this._onPopularTvGet()
        this._onTheAirTvGet()
    }

    _onTopRatedTvGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        let url = 'topRatedTvGet'
        let body = {
            "api_key": "1e614e28e3e30ee282026592fec6431c"
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.page == 1) {
                    let topRatedTvData = response.results
                    this.setState({
                        topRatedTvData,
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

    _onPopularTvGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        let url = 'popularTvGet'
        let body = {
            "api_key": "1e614e28e3e30ee282026592fec6431c"
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.page == 1) {
                    let popularTvData = response.results
                    this.setState({
                        popularTvData,
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

    _onTheAirTvGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        let url = 'onTheAirTvGet'
        let body = {
            "api_key": "1e614e28e3e30ee282026592fec6431c"
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.page == 1) {
                    let onTheAirData = response.results
                    this.setState({
                        onTheAirData,
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
        const { topRatedTvData, popularTvData, onTheAirData } = this.state
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <ScrollView style={styles.listArea}>
                        {this._renderLoading()}
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
                                    onPress={() => navigate('MainViewAllTv', { data: topRatedTvData })}>
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
                                    data={topRatedTvData.slice(0, 10)}
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
                                    onPress={() => navigate('MainViewAllTv', { data: popularTvData })}>
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
                                    data={popularTvData.slice(0, 10)}
                                    renderItem={this._renderMenu}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.flatlistArea}
                                    keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>

                        <View style={styles.listContent}>
                            <View style={styles.menuLabelArea}>
                                <Label
                                    text={'On The Air Show'}
                                    size={fs.xxl}
                                    lines={2}
                                    align={'center'}
                                    color={cd.primary}
                                    fontWeight={'bold'} />
                                <Ripple
                                    rippleColor={cd.title}
                                    onPress={() => navigate('MainViewAllTv', { data: onTheAirData })}>
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
                                    data={onTheAirData.slice(0, 10)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainTV)
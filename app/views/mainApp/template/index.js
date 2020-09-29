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
import VerifiedButton from '../../../components/button/verifiedButton'
import Ripple from 'react-native-material-ripple'
import FastImage from 'react-native-fast-image'

class Template extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingList: false,
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
            isLoadingList: true
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
                        isLoadingList: false,
                    })
                } else {
                    this.setState({
                        isLoadingList: false
                    })
                }
            } catch (error) {
                this.setState({
                    isLoadingList: false
                })
            }
        }).catch((error) => {
            this.setState({
                isLoadingList: false
            })
            rtoHandlingService()
        })
    }

    _onUpComingGet = () => {
        this.setState({
            isLoadingList: true
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
                        isLoadingList: false,
                    })
                } else {
                    this.setState({
                        isLoadingList: false
                    })
                }
            } catch (error) {
                this.setState({
                    isLoadingList: false
                })
            }
        }).catch((error) => {
            this.setState({
                isLoadingList: false
            })
            rtoHandlingService()
        })
    }

    _onPopularGet = () => {
        this.setState({
            isLoadingList: true
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
                        isLoadingList: false,
                    })
                } else {
                    this.setState({
                        isLoadingList: false
                    })
                }
            } catch (error) {
                this.setState({
                    isLoadingList: false
                })
            }
        }).catch((error) => {
            this.setState({
                isLoadingList: false
            })
            rtoHandlingService()
        })
    }

    render() {
        const { topRatedData, upComingData, popularData } = this.state
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <ScrollView style={styles.listArea}>
                        <View style={styles.menuNavArea}>
                            <VerifiedButton
                                label={'Movies'} />
                            <VerifiedButton
                                label={'Tv'}
                                isPrimary
                                onPress={() => navigate('MainTv')} />
                        </View>
                        <View style={styles.listContent}>
                            <View style={styles.menuLabelArea}>
                                <Label
                                    text={'Top Rated'}
                                    size={fs.xxl}
                                    lines={2}
                                    align={'center'}
                                    color={cd.primary}
                                    bold />
                                <Label
                                    text={'lihat semua'}
                                    size={fs.lg}
                                    lines={2}
                                    align={'center'}
                                    color={cd.secondary} />
                            </View>
                            <View>
                                <FlatList
                                    horizontal={true}
                                    data={topRatedData}
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
                                    bold />
                                <Label
                                    text={'lihat semua'}
                                    size={fs.lg}
                                    lines={2}
                                    align={'center'}
                                    color={cd.secondary} />
                            </View>
                            <View>
                                <FlatList
                                    horizontal={true}
                                    data={upComingData}
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
                                    bold />
                                <Label
                                    text={'lihat semua'}
                                    size={fs.lg}
                                    lines={2}
                                    align={'center'}
                                    color={cd.secondary} />
                            </View>
                            <View>
                                <FlatList
                                    horizontal={true}
                                    data={popularData}
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
        let title = item.original_title
        let path = item.poster_path
        let img = item.img
        const { navigate } = this.props.navigation
        return (
            <Ripple
                style={styles.menuArea}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Template)
import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { timeoutService, getServicedetail } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import { fs } from '../../../components/common/fontSizeData'
import { cd } from '../../../components/common/colorData'
import { Label } from '../../../components/common/label'
import VerifiedButton from '../../../components/button/verifiedButton'
import Ripple from 'react-native-material-ripple'
import FastImage from 'react-native-fast-image'
import { getUrl } from '../../../services/serviceApi';
const axios = require('axios');
import moment from 'moment';

class Template extends PureComponent {
    constructor(props) {
        super(props);
        const { data } = this.props.navigation.state.params
        this.state = {
            isLoading: false,
            detail_id: data,
        }

    }

    componentDidMount = async () => {
        this._onDetailGet()
    }

    _onDetailGet() {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        const { detail_id } = this.state
        let url = 'detailMoviesGet'
        let id = detail_id
        let body = {
            "api_key": "1e614e28e3e30ee282026592fec6431c"
        }
        timeoutService(60000, getServicedetail(url, id, body)).then((response) => {
            try {
                let popularity = response.popularity
                let title = response.title
                let img = response.poster_path
                let release = moment(response.release_date).format('YYYY')
                let img_backdrop = response.backdrop_path
                let overview = response.overview
                let vote_count = response.vote_count
                this.setState({
                    popularity,
                    img_backdrop,
                    title,
                    img,
                    release,
                    overview,
                    vote_count,
                    isLoading: false,
                })
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
        const { title, popularity, release, img_backdrop, overview, vote_count } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <ScrollView style={styles.listArea}>
                        {this._renderLoading()}
                        <View>
                            <FastImage source={{ uri: "https://image.tmdb.org/t/p/w500/" + img_backdrop }} style={styles.menuImg} />
                        </View>
                        <View style={{ flex: 1, margin: 10 }}>
                            <Label
                                text={title}
                                size={fs.xxl}
                                lines={2}
                                align={'left'}
                                color={cd.primary}
                                fontWeight={'bold'} />
                            <Label
                                text={release}
                                size={fs.xl}
                                lines={2}
                                align={'left'}
                                color={cd.secondary} />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Label
                                    text={'popularity : '}
                                    size={fs.lg}
                                    lines={2}
                                    align={'left'}
                                    color={cd.secondary} />
                                <Label
                                    text={popularity}
                                    size={fs.lg}
                                    lines={2}
                                    align={'center'}
                                    mr={15}
                                    color={cd.danger} />
                                <Label
                                    text={'voute : '}
                                    size={fs.lg}
                                    lines={2}
                                    align={'left'}
                                    color={cd.secondary} />
                                <Label
                                    text={vote_count}
                                    size={fs.lg}
                                    lines={2}
                                    align={'left'}
                                    color={cd.danger} />
                            </View>
                            <Label
                                text={'Overview'}
                                size={fs.xl}
                                lines={10}
                                align={'left'}
                                mt={10}
                                mb={10}
                                color={cd.secondary}
                                fontWeight={'bold'} />
                            <Label
                                text={overview}
                                size={fs.lg}
                                lines={10}
                                align={'left'}
                                color={cd.secondary} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
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
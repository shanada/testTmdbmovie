import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar, TextInput } from "react-native";
import { cd } from './colorData'
import { Label } from './label'

const HeaderNavigation = props => {
    const { isMovies, isTv } = props
    if (isMovies) {
        return (
            <View style={{ height: 50, backgroundColor: cd.primary, }}>
                <StatusBar
                    backgroundColor={cd.scondary}
                    barStyle="light-content"
                />
                <View style={{ flex: 1, paddingHorizontal: 14, justifyContent: 'center' }}>
                    <Label text={'Movies'} color={cd.title} size={18} bold />
                </View>
            </View>
        )
    } else if (isTv) {
        return (
            <View style={{ height: 50, backgroundColor: cd.primary, }}>
                <StatusBar
                    backgroundColor={cd.scondary}
                    barStyle="light-content"
                />
                <View style={{ flex: 1, paddingHorizontal: 14, justifyContent: 'center' }}>
                    <Label text={'Tv Show'} color={cd.title} size={18} bold />
                </View>
            </View>
        )
    }


}

export default HeaderNavigation;
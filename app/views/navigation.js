import React from 'react'
import { View, Image } from 'react-native'

import MainMovies from './mainApp/mainMovies'
import MainTv from './mainApp/mainTV'
import MainViewAll from './mainApp/mainViewAll'
import MainViewAllTv from './mainApp/mainViewAllTv'
import MainDetail from './mainApp/mainDetail'
import MainDetailTV from './mainApp/mainDetailTV'
import SearchMovies from './mainApp/searchMovies'
import Template from './mainApp/template'

import DefaultHeader from '../components/common/header'
import { BackButton } from '../components/button/backButton';
import { Title } from '../components/common/title';
import { cd } from '../components/common/colorData';

import { createAppContainer, } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createDrawerNavigator } from "react-navigation-drawer"
import Ionicons from 'react-native-vector-icons/Ionicons'


const MoviesStack = createStackNavigator(
  {
    MainMovies: {
      screen: MainMovies,
    },
  },
  {
    initialRouteName: 'MainMovies',
    defaultNavigationOptions: ({ navigation }) => ({
      cardStyle: { backgroundColor: cd.primary },
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      // headerLeft: () => <BackButton onBackButton={() => navigation.goBack()} />
    }),
  }
);

const TvStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    MainTv: {
      screen: MainTv,
    },
  },
  {
    initialRouteName: 'MainTv',
    defaultNavigationOptions: ({ navigation }) => ({
      cardStyle: { backgroundColor: cd.primary },
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      // headerLeft: () => <BackButton onBackButton={() => navigation.goBack()} />
    }),
  }
);

const TabNavigation = createBottomTabNavigator(
  {
    MainMovies: {
      screen: MoviesStack,
      navigationOptions: {
        tabBarLabel: "Movies",
        tabBarIcon: ({ tintColor, focused }) => (
          <View style={styles.tab}>
            <Ionicons name={"md-film"}
              style={{
                fontSize: 25,
                color: focused ? cd.primary : '#C4C4C4',
              }}
            />
          </View>
        )
      },
    },
    MainTv: {
      screen: TvStack,
      navigationOptions: {
        title: 'TV',
        tabBarIcon: ({ tintColor, focused }) => (
          <View style={styles.tab}>
            <Ionicons name={"md-videocam"}
              style={{
                fontSize: 25,
                color: focused ? cd.primary : '#C4C4C4',
              }}
            />
          </View>
        )
      }
    },

  },
  {
    // initialRouteName: 'Featured',
    tabBarOptions: {
      activeTintColor: cd.primary,
      inactiveTintColor: 'gray',
    },
  }
);
const MainNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigation,
      navigationOptions: {
        visible: false,
        headerShown: false,
      }
    },
    MainMovies: {
      screen: MainMovies,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        // headerTitle: () => <Title image />,
        headerLeft: () => null
      },
    },

    MainTv: {
      screen: MainTv,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        // headerTitle: () => <Title image />,
        headerLeft: () => null
      },
    },

    MainViewAll: {
      screen: MainViewAll,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: () => <Title title={'View All'} />
      },
    },
    MainViewAllTv: {
      screen: MainViewAllTv,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: () => <Title title={'View All'} />
      },
    },

    MainDetail: {
      screen: MainDetail,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: () => <Title title={'Detail'} />
      },
    },
    MainDetailTV: {
      screen: MainDetailTV,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: () => <Title title={'Detail Program'} />
      },
    },
    SearchMovies: {
      screen: SearchMovies,
      navigationOptions: {
        header: props => <DefaultHeader {...props} />,
        headerTitle: () => <Title title={'Search Movies'} />
      },
    },

  },

  {
    initialRouteName: 'Tabs',
    defaultNavigationOptions: ({ navigation }) => ({
      cardStyle: { backgroundColor: cd.background },
      headerStyle: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => <BackButton onBackButton={() => navigation.goBack()} />
    }),
  }
)
const DrawerNavigation = createDrawerNavigator(
  {
    drawer: {
      screen: MainNavigation
    },
  },
);

export const ParentNavigator = createStackNavigator({
  AppDrawer: {
    screen: DrawerNavigation,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    headerMode: 'AppDrawer',
  },
);


export const MainNavigator = createAppContainer(ParentNavigator)
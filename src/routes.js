import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Details from './pages/Details'

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Details: {
        screen: Details
    }
}, {

    initialRouteName: 'Home',

    defaultNavigationOptions: {
        headerTintColor: '#5cd277',
        headerStyle: {
            backgroundColor: '#222222'
        },
        headerBackTitle: null
    }

});

const Routes = createAppContainer(AppNavigator);

export default Routes;
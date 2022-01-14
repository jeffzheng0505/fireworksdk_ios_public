import React from 'react';

import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppTheme from './AppTheme';
import Checkout from './screens/Checkout';
import EmbedCart from './screens/EmbedCart';
import type { CartStackParamList } from './screens/paramList/CartStackParamList';
import { store } from './store';
import BackButton from './components/BackButton';
import { VideoShopping } from 'react-native-firework-sdk';

const StackNavigator = createNativeStackNavigator<CartStackParamList>();

const CartApp = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={AppTheme}>
        <NavigationContainer>
          <StackNavigator.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerBackTitleVisible: false,
              headerBackButtonMenuEnabled: false,
              headerLeft: ({ tintColor }) => {
                return <BackButton tintColor={tintColor} size={30} />;
              },
            }}
          >
            <StackNavigator.Screen
              name="EmbedCart"
              component={EmbedCart}
              options={{
                title: 'Host App Cart',
                headerLeft: ({ tintColor }) => {
                  return (
                    <BackButton
                      tintColor={tintColor}
                      size={30}
                      customBack={() => {
                        VideoShopping.getInstance().exitCartPage();
                      }}
                    />
                  );
                },
                headerBackVisible: false,
              }}
            />
            <StackNavigator.Screen name="Checkout" component={Checkout} />
          </StackNavigator.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default CartApp;

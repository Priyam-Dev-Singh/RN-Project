import React from 'react';
import { StatusBar, StyleSheet} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import { store, persistor } from './src/store';
import FeedScreen from './src/screens/FeedScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.bg}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: '#111'},
                headerTintColor: '#fff'
              }}>

              <Stack.Screen name="Feed" component={FeedScreen} options={{title: 'Archives'}} />
              <Stack.Screen 
                name="Details" 
                component={DetailsScreen} 
                options={{ title: 'Data Entry' }} 
              />
              
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#000'
  }
});

export default App;
import * as React from 'react';
import { Button,View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details',{
            itemId: 86,
            otherParam: 'anything you want here',
          })}
      />
      <Button title ="change the title" onPress={()=>navigation.setOption({title:"new title"})}/>
    </View>
  );
}

function DetailsScreen({navigation,route}) {

    const {itemId, otherParam } =route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId:{itemId}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button title="Go to Details... again with history stack" onPress={() => navigation.navigate('Details',{itemId: Math.floor(Math.random() * 100)})}/>
      <Button title="Go to Details... again without history stack" onPress={() => navigation.push('Details',route.params)}/>
      <Button title="Go Back" onPress={() => navigation.goBack()}/>
      <Button title="Go Home1" onPress={() => navigation.navigate("Home3")}/>
      <Button title="Go Home2" onPress={() => navigation.popToTop()}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home2" component={HomeScreen}  options={{ title: 'Home' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
import * as React from 'react';
import { Button,View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlexDirectionBasics from "./howtolayout"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Echart from './explore'
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen  One Day After Spring Festival</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details',{
            itemId: 86,
            otherParam: 'anything you want here',
          })}
      />
      <Button 
      title ="change the title" 
      onPress={() => navigation.setOptions({title:"new title"})}/>
    </View>
  );
}

function DetailsScreen({navigation,route}) {

    const {itemId, otherParam } =route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,flexDirection:"column"}}>
      <Text>Details Screen</Text>
      <Text>itemId:{itemId}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <View >
          <TouchableOpacity style = {style.botton}>
            <Button title="Go to Details... again with history stack " onPress={() => navigation.navigate('Details',{itemId: Math.floor(Math.random() * 100)})}/>
          </TouchableOpacity>
          <TouchableOpacity style = {style.botton}>
          <Button title="Go to Details... again without history stack" onPress={() => navigation.push('Details',route.params)}/>
          </TouchableOpacity>
          <TouchableOpacity style = {style.botton}>
          <Button title="Go Back" onPress={() => navigation.goBack()}/>
          </TouchableOpacity>
          <TouchableOpacity style = {style.botton}>
          <Button title="Go Home1" onPress={() => navigation.navigate("Home")}/>
          </TouchableOpacity>
          <TouchableOpacity style = {style.botton}>
          <Button title="Go Home2" onPress={() => navigation.popToTop()}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  botton:{
    backgroundColor:'pink',
    marginTop:10,
  },
  options:{
    // title: 'React Native learn doc',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <Button
        onPress={() => alert('This is v0.0.1')}
        title="version"
        color="#fff"
      />
    ),
  }
})

const Tab = createBottomTabNavigator();
function TrueHome() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Layout') {
              iconName = focused ? 'ios-airplane' : 'ios-airplane-outline';
            } else if(route.name ==='Explore'){
              iconName = focused ? 'ios-map':'ios-map-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}  
          options={style.options}
          />
        <Tab.Screen name="Layout" component={FlexDirectionBasics} 
          options={style.options} />
        <Tab.Screen name="Explore" component={Echart} 
          options={style.options} />
      </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home2" component ={TrueHome}  options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="layout" component={FlexDirectionBasics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;



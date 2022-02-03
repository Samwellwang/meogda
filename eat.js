import React from 'react';
import{View,Text,Button} from 'react-native';

const Eat = ()=>{
    // justifyContent 垂直居中
    // alignItems 水平居中
    return (
        <View style={{flex:1,alignItems:'center', justifyContent: 'center'}}> 
            <Text>What would you like to eat today?</Text>
            <Button title = "获取位置"/>
        </View>
    )
}
export default Eat;
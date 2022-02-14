import React, { useEffect, useState } from 'react'
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { init, Geolocation } from 'react-native-amap-geolocation'

const Eat = () => {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [shopInfo, setShopInfo] = useState({})
  const [shop, setShop] = useState("")

  //amap-geolocation
  // 对于 Android 需要自行根据需要申请权限
  // PermissionsAndroid.requestMultiple([
  //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  // ]);

  // 使用自己申请的高德 App Key 进行初始化
  init({
    ios: '2a70f08f53cf459d9c0093ad5fe1ad3a',
    android: '043b24fe18785f33c491705ffe5b6935',
  })
  useEffect(() => {
    getLocation()
    //获取附近商家
    //fetch
    getDate()
  }, [])
  //获取经纬度
  const getLocation = async () => {
    setLoading(true)
    Geolocation.getCurrentPosition(({ coords }) => {
      setLoading(false)
      setData(coords)
      console.log(coords)
    })
  }
  const getDate = async () => {
    const apiOption = {
      key: '2a70f08f53cf459d9c0093ad5fe1ad3a',
      keywords: '',
      // location: data.longitude, data.latitude,
      radius: 2000,
      types: '050000',
      offset: 50,
      page: 1,
      extensions: 'all',
      sortrule: 'weight',
    }
    const url = `https://restapi.amap.com/v3/place/around?key=${apiOption.key}&keywords=${apiOption.keywords}&location=${data.longitude},${data.latitude}&radius=${apiOption.radius}&types=${apiOption.types}&offset=${apiOption.pageSize}&page=${apiOption.page}&extensions=${apiOption.extensions}&sortrule=${apiOption.sortrule}`

    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setShopInfo(res.pois)
        console.log(res.pois)
      })
  }

  return (
    <View style={Style.background}>
      <Text>What would you like to eat today?</Text>
      <Button title="获取位置" onPress={() => {
        //random between 0 and 19
        const random = Math.floor(Math.random() * 20);
        setShop(shopInfo[random].name);
      }} />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text>维度：{data.latitude}</Text>
            <Text>经度：{data.longitude}</Text>
            <Text>{shop}</Text>
          </View>
        )}
      </View>
    </View>
  )
}
const Style = StyleSheet.create({
  // justifyContent 垂直居中
  // alignItems 水平居中\
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'pink',
  },
})
export default Eat

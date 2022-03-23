import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet ,Animated} from 'react-native'
import { init, Geolocation } from 'react-native-amap-geolocation'
import { NativeModules } from 'react-native';

const Eat = () => {
  //是否显示圈圈
  const [isLoading, setLoading] = useState(false)
  //定位信息
  // const [data, setData] = useState({});不能及时被更新
  const data = useRef({})
  //高德返回的POI信息
  const [shopInfo, setShopInfo] = useState([])
  //随机后的商店
  const [shop, setShop] = useState({})

   const anim = useRef(new Animated.Value(1)).current  // 

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
  }, [])

  //获取经纬度
  const getLocation = () => {
    setLoading(true)
    Geolocation.getCurrentPosition(({ coords }) => {
      setLoading(false)
      // setData(coords);
      data.current = coords
      // setData(prveData => {
      //   //直接取会取不到data的值
      //   console.log(prveData.longitude, prveData.latitude);
      //   getDate(prveData.longitude, prveData.latitude);
      //   return prveData;
      //  });
      getData()
      //获取附近商家
      console.log(coords)
    })
  }
  const getData = () => {
    const apiOption = {
      key: '2a70f08f53cf459d9c0093ad5fe1ad3a',
      keywords: '',
      longitude: data.current.longitude,
      latitude: data.current.latitude,
      radius: 2000,
      types: '050000',
      offset: 50,
      page: 1,
      extensions: 'all',
      sortrule: 'weight',
    }
    const url = `https://restapi.amap.com/v3/place/around?key=${apiOption.key}&keywords=${apiOption.keywords}&location=${apiOption.longitude},${apiOption.latitude}&radius=${apiOption.radius}&types=${apiOption.types}&offset=${apiOption.pageSize}&page=${apiOption.page}&extensions=${apiOption.extensions}&sortrule=${apiOption.sortrule}`

    fetch(url, {
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
  const buttonClick = () => {
    //random between 0 and 19
    if (shopInfo.length == 0) {
      alert('附近没有商家')
    } else {
    const random = Math.floor(Math.random() * 20)
      setShop(shopInfo[random]);
      // console.log("shop信息", anim)

    }
  }
  // /**
  //    * 获取短信内容
  //    */
  // const getAllSMS() {
 
  //       var rnToastAndroid = NativeModules.ToastByAndroid;
  //       rnToastAndroid.getSmsInPhone().then((map) => {
  //           console.log(map['sms']);
  //           //想更直观一点，可以解除下面的注释
  //           //alert(map['sms']);
           
  //       }, (code, message) => {
  //           alert(message);
  //       });
  //   }
  return (
    <View style={Style.background}>
      <View style = {{weight:200}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={Style.resultView}>
            {/* <Text>维度：{data.current.latitude}</Text>
            <Text>经度：{data.current.longitude}</Text> */}
            <Text style={Style.title}>{shop.name}</Text>
            <Text>{shop.address}</Text>
            <Text>
              {shop.distance}
              {JSON.stringify(shop) == '{}' ? '' : '米'}
            </Text>
          </View>
        )}
      </View>
      <Button
        title="随机一个"
        onPress={() => {
            buttonClick();
        }}
      />
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
    backgroundColor: 'navajowhite',
  },
  resultView: {
    weight: '80%',
    height: 100,
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 10,

  },
  title: {
    fontSize: 20,
    color: 'balck',
    fontWeight: 'bold',
  },
})
export default Eat

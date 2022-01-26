import React from "react";
import { View } from "react-native";
import RNEChartsPro from "react-native-echarts-pro";
import ChinaJsonData from "./ChinaMap.js";

export default function Demo() {
  const mapData = {
    visualMap: {
      show: false,
      left: "right",
      top: "center",
      min: 1,
      max: 3,
      calculable: true,
    },
    geo: [
      {
        type: "map",
        map: "world",
        mapType: "world",
        selectedMode: "single",
        itemStyle: {
          normal: {
            areaStyle: { color: "#B1D0EC" },
            color: "#eeeeee",
            borderColor: "#dadfde",
          },
          emphasis: {
            //mouse hover style
            label: {
              show: true,
              textStyle: {
                color: "#000000",
              },
            },
          },
        },
        data: [],
        roam: true,
      },
    ],
    series: {
      type: "effectScatter",
      coordinateSystem: "geo",
      geoIndex: 0,
      symbolSize: function (params) {
        return (params[2] / 100) * 15 + 5;
      },
      itemStyle: {
        color: "red",
      },
      data: [[116.4551, 40.2539, 10]],
    },
    toolbox: {
      // 显示策略，可选为：true（显示） | false（隐藏）
      show: true,
      // 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
      orient: "vertical",
      // 水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
      x: "left",
      // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
      y: "bottom",
      // 工具箱背景颜色，默认透明
      backgroundColor: "#1e90ff60",
      // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
      itemGap: 10,
      // 工具箱icon大小，单位（px）
      itemSize: 10,
      // 工具箱icon颜色序列，循环使用，同时支持在具体feature内指定color
      color: "#ffffff",
      // 是否显示工具箱文字提示，默认启用
      showTitle: true,
      feature: {
        // 还原，复位原始图表
        restore: {
          show: true,
          title: "还原",
        },
      },
    },
  };

  return (
    <View style={{ height: 300 }}>
      {/* <RNEChartsPro height={250} option={mapData} onPress ={res=>console.log(this)} customMapData={ChinaJsonData} /> */}
      <RNEChartsPro height={250} option={mapData} onPress ={res=>console.log(this)} />
    </View>
  );
}

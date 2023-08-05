import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {listTopInvokeInterfaceInfoUsingGET} from "@/services/smartapi-backend/analysisController";

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {

  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);

  // 从远程获取数据
  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGET().then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
    } catch (e: any) {

    }
  }, [])

  // 映射：{ value: 1048, name: 'Search Engine' },
  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })

  // 可以从图标官网更更换图标，直接替换掉option
  const option = {
    title: {
      text: '调用次数最多的接口TOP3',
      left: 'center',
      top: true
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    // 相当于图例
    legend: {
      left: 'left',
      top: 'top',
      // 竖排显示接口信息
      orient: 'vertical',
      data: chartData
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Radius Mode',
        type: 'pie',
        radius: [18, 120],
        center: ['25%', '60%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: true
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: chartData
      },
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [18, 120],
        center: ['75%', '60%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: chartData
      }
    ]

  };

  return (
    <PageContainer>
      <ReactECharts option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;

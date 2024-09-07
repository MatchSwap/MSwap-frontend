import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { getTVL } from '../../../hooks/useRequest'
import dayjs from 'dayjs'
import styled from 'styled-components'
import Column from '../../../components/Column'
import { useTranslation } from 'react-i18next'
import { formatNumber } from '../../../utils/tools'

const Charts = styled.div`
  width: 100%;
  height: 300px;
`
const ChartsTitle = styled.div`
  color: var(--Color-Text-Text_01Title-text, #202020);
  font-family: 'CocoSharp S';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 144.444% */
`
const ChartsUnits = styled.div`
  color: #000;
  font-family: 'CocoSharp S';
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px; /* 116.667% */
`

export default function LineChart() {
  // const [tvlCurData, setTvlCurData] = useState<any>(null)

  const [curValue, setCurValue] = useState<any>(0)
  const [volData, setVolData] = useState<any>(null)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const getData = async (type: any) => {
    const res: any = await getTVL()
    console.log(res.v2_daily_tvl, 'res---')
    setVolData(res.v2_daily_tvl)
  }

  useEffect(() => {
    getData('MONTH')
  }, [])
  // Update screenWidth on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    const timestamps = volData && volData.map((item: any) => dayjs.unix(item.timestamp).format('MM-DD'))
    const values = volData && volData.map((item: any) => item.value)
    console.log(values, 'values')
    if (!values) return
    const chartDom = document.getElementById('lineChart')
    const myChart = echarts.init(chartDom)
    const option = {
      tooltip: {
        showContent: false,
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: timestamps ?? []
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#C4FF6D' },
              { offset: 1, color: '#FFFFFF' }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: values ?? []
        }
      ]
    }

    option && myChart.setOption(option)

    // 监听鼠标移动事件，实时获取最近的数据点信息
    // myChart.getZr().on('mousemove', params => {
    //   console.log('params:', params)
    // })
    myChart.on('showTip', (params: any) => {
      const cData = option.series[0].data
      // console.log('Tooltip data:', cData[params.dataIndex])
      setCurValue(cData[params.dataIndex])
    })

    // Clean up the chart when the component unmounts
    return () => {
      myChart.dispose()
    }
  }, [screenWidth, volData]) // Empty dependency array ensures this effect runs only once

  const { t } = useTranslation()
  return (
    <Column style={{ width: '50%', height: ' 300px' }}>
      <ChartsTitle>{t('MSwap TVL')}</ChartsTitle>
      <ChartsUnits>{`$${formatNumber(curValue)}`}</ChartsUnits>
      <Charts id="lineChart" />
    </Column>
  )
}

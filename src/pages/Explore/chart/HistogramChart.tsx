import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts'
// import dayjs from 'dayjs'
import styled from 'styled-components'
import Column from '../../../components/Column'
// import { formatMoney } from '../../../utils'
import { useTranslation } from 'react-i18next'
import Row, { RowBetween } from '../../../components/Row'
import { ExploreVolumeTabs } from '../../../components/NavigationTabs/HeaderIndex'
import { getVolume } from '../../../hooks/useRequest'
import { formatNumber } from '../../../utils/tools'
import dayjs from 'dayjs'

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
const ChartsType = styled.div`
  margin-left: 15px;
  color: #404040;
  font-family: 'CocoSharp S';
  font-size: 14px;
  padding: 1.5px 6px;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 6px;
  background: #f6f6f6;
`

const ChartsUnits = styled.div`
  color: #000;
  font-family: 'CocoSharp S';
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px; /* 116.667% */
`

export default function HistogramChart() {
  const [curType, setCurType] = useState('Day')
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [curValue, setCurValue] = useState<any>(0)
  const [volData, setVolData] = useState<any>(null)

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

  const getData = async (type: any) => {
    const data: any = await getVolume({ duration: type })
    setVolData(data.v2_daily_tvl)
  }

  useEffect(() => {
    const timestamps = volData && volData.map((item: any) => dayjs.unix(item.timestamp).format('MM-DD'))
    const values = volData && volData.map((item: any) => item.value)
    if (!values) return
    const chartDom = document.getElementById('histogramChart')
    const myChart = echarts.init(chartDom)
    let option: any = null

    const series = [
      {
        data: values,
        type: 'bar',
        stack: 'a',
        name: 'a',
        itemStyle: {
          color: '#C8FC7C'
        }
      }
    ]
    const stackInfo: any = {}
    for (let i = 0; i < series[0].data.length; ++i) {
      for (let j = 0; j < series.length; ++j) {
        const stackName = series[j].stack
        if (!stackName) {
          continue
        }
        if (!stackInfo[stackName]) {
          stackInfo[stackName] = {
            stackStart: [],
            stackEnd: []
          }
        }
        const info = stackInfo[stackName]
        const data: any = series[j].data[i]
        if (data && data !== '-') {
          if (info.stackStart[i] == null) {
            info.stackStart[i] = j
          }
          info.stackEnd[i] = j
        }
      }
    }

    for (let i = 0; i < series.length; ++i) {
      const data: any = series[i].data
      const info = stackInfo[series[i].stack]
      for (let j = 0; j < series[i].data.length; ++j) {
        const isEnd = info.stackEnd[j] === i
        const topBorder = isEnd ? 20 : 0
        const bottomBorder = 0
        data[j] = {
          value: data[j],
          itemStyle: {
            borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
          }
        }
      }
    }

    option = {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: timestamps
      },
      yAxis: {
        type: 'value'
      },
      series: series
    }

    option && myChart.setOption(option)

    myChart.on('mousemove', (params: any) => {
      if (params.componentType === 'series') {
        const selectedValue = params.value
        setCurValue(selectedValue)
      }
    })

    // Clean up the chart when the component unmounts
    return () => {
      myChart.dispose()
    }
  }, [screenWidth, volData]) // Empty dependency array ensures this effect runs only once

  const { t } = useTranslation()

  const onTab = (item: any) => {
    setCurType(item)
    let type = 'MONTH'
    if (item === 'Week') {
      type = 'YEAR'
    } else if (item === 'Month') {
      type = 'MAX'
    }
    getData(type)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getData('MONTH')
  }, [])

  return (
    <Column style={{ width: '50%', height: '300px' }}>
      <RowBetween>
        <Row>
          <ChartsTitle>{t('MSwap volume')}</ChartsTitle>
          <ChartsType>
            {curType === 'Month' ? t('All time') : curType === 'Week' ? t('Past year') : t('Past month')}
          </ChartsType>
        </Row>
        <ExploreVolumeTabs onBtnClick={onTab} type={curType}></ExploreVolumeTabs>
      </RowBetween>
      <ChartsUnits>{`$${formatNumber(curValue)}`}</ChartsUnits>
      <Charts id="histogramChart" />
    </Column>
  )
}

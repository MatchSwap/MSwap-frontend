import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HistogramChart from './chart/HistogramChart'
import LineChart from './chart/LineChart'
import { RowBetween } from '../../components/Row'
import { ExploreHeaderTabs } from '../../components/NavigationTabs/HeaderIndex'
import { RouteComponentProps } from 'react-router-dom'
import { getTopTokens, getTokenConf, getTopPairs, getTransactions } from '../../hooks/useRequest'
import TokenTable from './table/TokenTable'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { CheckOutlined, DownOutlined } from '@ant-design/icons'
import PoolTable from './table/PoolTable'
import TransactionTable from './table/TransactionTable'

const ExploreContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 320px;

  @media only screen and (max-width: '420px') {
    padding: 16px;
    padding-bottom: 0px;
  }
`
const ExploreCharts = styled.div`
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`
const buttonStyle = {
  background: '#F6F6F6', // 初始背景色为灰色
  border: 'none',
  color: '#000'
}

export default function Explore({ history }: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const [curType, setCurType] = useState('Tokens')
  const [curVolume, setCurVolume] = useState('DAY')
  const [tokenTableData, setTokenTableData] = useState<any>([])
  const [poolTableData, setPoolTableData] = useState<any>([])
  const [transactionTableData, setTransactionTableData] = useState<any>([])

  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    setTokenTableData([])
    setPoolTableData([])
    setTransactionTableData([])
    setCurVolume(e.key)
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Space>
          {'1D volume'}
          {curVolume === 'DAY' && <CheckOutlined style={{ color: '#86CC22' }} />}
        </Space>
      ),
      key: 'DAY'
    },
    {
      label: (
        <Space>
          {'1W volume'}
          {curVolume === 'WEEK' && <CheckOutlined style={{ color: '#86CC22' }} />}
        </Space>
      ),
      key: 'WEEK'
    },
    {
      label: (
        <Space>
          {'1M volume'}
          {curVolume === 'MONTH' && <CheckOutlined style={{ color: '#86CC22' }} />}
        </Space>
      ),
      key: 'MONTH'
    },
    {
      label: (
        <Space>
          {'1Y volume'}
          {curVolume === 'YEAR' && <CheckOutlined style={{ color: '#86CC22' }} />}
        </Space>
      ),
      key: 'YEAR'
    }
  ]

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  const getData = async (frist?: number) => {
    const tokenData: any = await getTokenConf()
    if (curType === 'Tokens') {
      const tokensListData: any = await getTopTokens({ duration: curVolume, first: frist ?? 100 })
      const data = tokensListData.map((item: any, index: number) => {
        return {
          ...item,
          key: index,
          image: tokenData && tokenData[item.symbol] ? tokenData[item.symbol]['logoURI'] : ''
        }
      })
      const list = tokenTableData.concat(data)
      setTokenTableData(list)
    } else if (curType === 'Pools') {
      const poolListData: any = await getTopPairs({ first: frist ?? 100 })
      const data = poolListData.map((item: any, index: any) => {
        return {
          ...item,
          key: `${Date()}${index}`,
          token0: {
            ...item.token0,
            image: tokenData && tokenData[item.token0.symbol] ? tokenData[item.token0.symbol]['logoURI'] : ''
          },
          token1: {
            ...item.token1,
            image: tokenData && tokenData[item.token1.symbol] ? tokenData[item.token1.symbol]['logoURI'] : ''
          }
        }
      })
      const list = poolTableData.concat(data)
      setPoolTableData(list)
    } else {
      const transactionListData: any = await getTransactions({ first: frist ?? 100 })
      const data = transactionListData.map((item: any, index: any) => {
        return {
          ...item,
          key: `${Date()}${index}`,
          // eslint-disable-next-line @typescript-eslint/camelcase
          token0_obj: {
            ...item.token0_obj,
            image: tokenData && tokenData[item.token0_obj.symbol] ? tokenData[item.token0_obj.symbol]['logoURI'] : ''
          },
          // eslint-disable-next-line @typescript-eslint/camelcase
          token1_obj: {
            ...item.token1_obj,
            image: tokenData && tokenData[item.token1_obj.symbol] ? tokenData[item.token1_obj.symbol]['logoURI'] : ''
          }
        }
      })
      const list = transactionTableData.concat(data)
      setTransactionTableData(list)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setTokenTableData([])
    setPoolTableData([])
    setTransactionTableData([])
    getData()
  }, [curVolume, curType])

  useEffect(() => {
    if (tokenTableData.length == 0) {
      getData()
    }
  }, [tokenTableData])

  const onTab = (item: any) => {
    setCurType(item)
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    // Load more data when scrolled to the bottom
    if (curType === 'Tokens') {
      tokenTableData.length % 100 === 0 && getData(tokenTableData.length + 100)
    }
    if (curType === 'Pools') {
      poolTableData.length % 100 === 0 && getData(poolTableData.length + 100)
    }
    if (curType === 'Transaction') {
      transactionTableData.length % 100 === 0 && getData(transactionTableData.length + 100)
    }
  }

  useEffect(() => {
    if (curType) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [curType, transactionTableData, tokenTableData, poolTableData])

  return (
    <ExploreContainer>
      <ExploreCharts>
        <RowBetween>
          <LineChart />
          <HistogramChart />
        </RowBetween>
      </ExploreCharts>
      <RowBetween>
        <ExploreHeaderTabs onTabClick={onTab} stype={curType} />
        {curType === 'Tokens' && (
          <Dropdown menu={menuProps}>
            <Button shape="round" style={buttonStyle}>
              <Space>
                {curVolume === 'DAY' && '1D volume'}
                {curVolume === 'WEEK' && '1W volume'}
                {curVolume === 'MONTH' && '1M volume'}
                {curVolume === 'YEAR' && '1Y volume'}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        )}
      </RowBetween>
      {curType === 'Tokens' && <TokenTable data={tokenTableData}></TokenTable>}
      {curType === 'Pools' && <PoolTable data={poolTableData}></PoolTable>}
      {curType === 'Transaction' && <TransactionTable data={transactionTableData}></TransactionTable>}
    </ExploreContainer>
  )
}

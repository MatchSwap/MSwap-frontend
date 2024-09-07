/* eslint-disable react/display-name */
import React from 'react'
import { Table, Space } from 'antd'
import { TableProps } from 'antd'
// import { formatMoney } from '../../../utils'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { formatNumber } from '../../../utils/tools'

interface TokenDataType {
  key: string
  name: string
  price: number
  price_change_1day: number
  price_change_1hour: number
  symbol: string
  total_liquidity_usd: string
  trade_volume_usdt: string
}

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
const ChartsType = styled.div`
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

const TokenText = styled.span<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  color: #000;
  font-family: 'PingFang HK';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`

const columns: TableProps<TokenDataType>['columns'] = [
  { title: '#', key: 'index', render: (text, record, index: any) => <span>{index + 1}</span> },
  {
    title: 'Token Name',
    dataIndex: 'name',
    key: 'name',
    render: (_: any, data: any) => {
      return (
        <Space>
          <IconWrapper>{data.image && <img src={data.image ?? ''} />}</IconWrapper>

          {data.name}
          <ChartsType>{data.symbol}</ChartsType>
        </Space>
      )
    }
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (data: any) => {
      return <TokenText>${formatNumber(data)}</TokenText>
    }
  },
  {
    title: '1 hour',
    key: 'price_change_1hour',
    dataIndex: 'price_change_1hour',
    render: (data: any) => {
      return (
        <Space>
          {data > 0 ? (
            <CaretUpOutlined style={{ color: '#F24F3B' }} />
          ) : (
            <CaretDownOutlined style={{ color: '#86CC22' }} />
          )}
          <span style={{ color: `${data > 0 ? '#F24F3B' : '#86CC22'}` }}>{`${data}%`}</span>
        </Space>
      )
    }
  },
  {
    title: '1 day',
    key: 'price_change_1day',
    dataIndex: 'price_change_1day',
    render: (data: any) => {
      return (
        <Space>
          {data > 0 ? (
            <CaretUpOutlined style={{ color: '#F24F3B' }} />
          ) : (
            <CaretDownOutlined style={{ color: '#86CC22' }} />
          )}
          <span style={{ color: `${data > 0 ? '#F24F3B' : '#86CC22'}` }}>{`${data * 100}%`}</span>
        </Space>
      )
    }
  },
  {
    title: 'FDV',
    dataIndex: 'total_liquidity_usd',
    key: 'total_liquidity_usd',
    render: (data: any) => {
      return <TokenText>${formatNumber(data)}</TokenText>
    }
  },
  {
    title: 'Volume',
    dataIndex: 'trade_volume_usdt',
    key: 'trade_volume_usdt',
    sorter: (a: any, b: any) => a.trade_volume_usdt - b.trade_volume_usdt,
    render: (data: any) => {
      return <TokenText>${formatNumber(data)}</TokenText>
    }
  }
]
export default function TokenTable({ data }: any) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: true }}
      // onRow={(record: any) => {
      //   return {
      //     onClick: () => {
      //       history.push('/exploreDetail')
      //     }
      //   }
      // }}
    />
  )
}

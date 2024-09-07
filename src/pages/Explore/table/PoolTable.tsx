/* eslint-disable react/display-name */
import React from 'react'
import { Table, Space } from 'antd'
import { TableProps } from 'antd'
import styled from 'styled-components'
import { formatNumber } from '../../../utils/tools'

interface PoolDataType {
  key: string
  apr_1day: number
  token0: any
  token1: any
  trade_usdt_1day: number
  trade_usdt_7day: number
  txCount: number
}
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

const CircleContainer = styled.div`
  position: relative;
  width: 36px; /* 设置圆的直径 */
  height: 36px; /* 设置圆的直径 */
  border-radius: 50%; /* 将容器设置为圆形 */

  overflow: hidden; /* 隐藏超出圆形容器的部分 */
  & img {
    width: 100%;
    height: 100%;
    display: block;
  }
`

const HalfImage = styled.div`
  position: absolute;
  width: 95%;
  height: 100%;
  overflow: hidden;
`

// const IconWrapper = styled.div<{ size?: number }>`
//   ${({ theme }) => theme.flexColumnNoWrap};
//   align-items: center;
//   justify-content: center;
//   & > * {
//     height: ${({ size }) => (size ? size + 'px' : '32px')};
//     width: ${({ size }) => (size ? size + 'px' : '32px')};
//   }
// `

const TokenText = styled.span<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  color: #000;
  font-family: 'PingFang HK';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`

const columns: TableProps<PoolDataType>['columns'] = [
  { title: '#', key: 'index', render: (text, record, index: any) => <span>{index + 1}</span> },
  {
    title: 'pool',
    dataIndex: 'token0',
    key: 'token0',
    render: (_: any, data: any) => {
      return (
        <Space>
          {/* <IconWrapper>{data.image && <img src={data.image ?? ''} />}</IconWrapper> */}
          <CircleContainer>
            <HalfImage style={{ clipPath: 'inset(0 50% 0 0)', left: '0' }}>
              <img src={data.token0.image} alt="Left Half" />
            </HalfImage>
            <HalfImage style={{ clipPath: 'inset(0 0 0 50%)', right: '0' }}>
              <img src={data.token1.image} alt="Right Half" />
            </HalfImage>
          </CircleContainer>
          {`${data.token0.symbol}/${data.token1.symbol}`}
          <ChartsType>{'0.3%'}</ChartsType>
        </Space>
      )
    }
  },
  {
    title: 'Transactions',
    dataIndex: 'txCount',
    key: 'txCount',
    align: 'right',
    render: (data: any) => {
      return <TokenText>{formatNumber(data)}</TokenText>
    }
  },
  {
    title: 'TVL',
    key: 'reserveUSD',
    dataIndex: 'reserveUSD',
    align: 'right',
    sorter: (a: any, b: any) => a.reserveUSD - b.reserveUSD,
    render: (data: any) => {
      return <TokenText>${formatNumber(data)}</TokenText>
    }
  },
  {
    title: '1 day volume',
    key: 'trade_usdt_1day',
    dataIndex: 'trade_usdt_1day',
    align: 'right',
    render: (data: any) => {
      return <TokenText>${formatNumber(data)}</TokenText>
    }
  },
  {
    title: '7 day volume',
    key: 'trade_usdt_7day',
    dataIndex: 'trade_usdt_7day',
    align: 'right',
    render: (data: any) => {
      return <TokenText>${formatNumber(data)}</TokenText>
    }
  }
  // {
  //   title: '1 day APR',
  //   dataIndex: 'apr_1day',
  //   key: 'apr_1day',
  //   render: (data: any) => {
  //     return <Space>{data}%</Space>
  //   }
  // }
]
export default function PoolTable({ data }: any) {
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

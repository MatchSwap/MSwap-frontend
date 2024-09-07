/*
 * @Author: Evan 360313191@qq.com
 * @Date: 2024-09-07 01:51:17
 * @LastEditors: Evan 360313191@qq.com
 * @LastEditTime: 2024-09-07 17:38:34
 * @FilePath: \Mswap_devMain\src\pages\Explore\table\TransactionTable.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable react/display-name */
import React from 'react'
import { Space, Table } from 'antd'
import { TableProps } from 'antd'
import styled from 'styled-components'
import { shortenAddress } from '../../../utils'
import { formatNumber, timeAgo } from '../../../utils/tools'

interface TransactionDataType {
  key: string
  account: string
  block_number: string
  chain: string
  hash: string
  timestamp: string
  token0_amount: string
  token0_obj: any
  token0_price: string
  token1_amount: string
  token1_obj: any
  token1_price: string
  type: string
  usd_amount: string
}

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: -4px;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const SwapText = styled.span<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  color: #a8a8a8;
  text-align: center;
  font-family: 'PingFang HK';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`

const TokenText = styled.span<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  color: #000;
  text-align: center;
  font-family: 'PingFang HK';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`

const TimeText = styled.span<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  color: #a8a8a8;
  font-family: 'PingFang HK';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`

const columns: TableProps<TransactionDataType>['columns'] = [
  {
    title: 'Time',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (data: any) => {
      return (
        <Space>
          <TimeText>{timeAgo(data)}</TimeText>
        </Space>
      )
    }
  },
  {
    title: 'Type',
    render: (data: any, item: any) => {
      console.log(item, data)
      return (
        <Space>
          <SwapText>Swap</SwapText>
          <IconWrapper size={20}>{item.token0_obj.image && <img src={item.token0_obj.image ?? ''} />}</IconWrapper>
          <TokenText>{item.token0_obj.symbol}</TokenText>
          <TokenText>{'for'}</TokenText>
          <IconWrapper size={20}>{item.token1_obj.image && <img src={item.token1_obj.image ?? ''} />}</IconWrapper>
          <TokenText>{item.token1_obj.symbol}</TokenText>
        </Space>
      )
    }
  },
  {
    title: 'USD',
    dataIndex: 'usd_amount',
    key: 'usd_amount',
    align: 'right',
    render: (data: any) => {
      return (
        <Space>
          <TokenText>${formatNumber(data)}</TokenText>
        </Space>
      )
    }
  },
  {
    title: 'Token amount',
    key: 'token0_amount',
    dataIndex: 'token0_amount',
    align: 'right',
    render: (data: any, _render: any) => {
      return (
        <Space>
          <TokenText>{formatNumber(data)}</TokenText>
          <IconWrapper size={20}>
            {_render.token0_obj.image && <img src={_render.token0_obj.image ?? ''} />}
          </IconWrapper>
          <TokenText>{_render.token0_obj.symbol}</TokenText>
        </Space>
      )
    }
  },
  {
    title: 'Token amount',
    key: 'token1_amount',
    dataIndex: 'token1_amount',
    align: 'right',
    render: (data: any, _render: any) => {
      return (
        <Space>
          <TokenText>{formatNumber(data)}</TokenText>
          <IconWrapper size={20}>
            {_render.token1_obj.image && <img src={_render.token1_obj.image ?? ''} />}
          </IconWrapper>
          <TokenText>{_render.token1_obj.symbol}</TokenText>
        </Space>
      )
    }
  },
  {
    title: 'Wallet',
    key: 'account',
    dataIndex: 'account',
    align: 'right',
    render: (data: any) => {
      return <Space>{shortenAddress(data)}</Space>
    }
  }
]
export default function TransactionTable({ data }: any) {
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

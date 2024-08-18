import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { ArrowLeft } from 'react-feather'
import Row, { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'
import Settings from '../Settings'

const Tabs = styled.div`
  max-width: 420px;
  width: 100%;
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-between;
`
const TabsItem = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  margin-right: 32px;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    /* border-radius: 12px; */
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg7};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ActiveText = styled.div`
  margin-left: 1rem;
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '20px' }}>
      <TabsItem>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
          {t('swap')}
        </StyledNavLink>
        <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
          {t('pool')}
        </StyledNavLink>
      </TabsItem>
      <Settings />
    </Tabs>
  )
}

export function FindPoolTabs() {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <Row>
          <HistoryLink to="/pool">
            <StyledArrowLeft />
          </HistoryLink>
          <ActiveText>{adding ? 'Add' : 'Remove'} Liquidity</ActiveText>
        </Row>
        {/* <Settings /> */}
        {/* <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        /> */}
      </RowBetween>
    </Tabs>
  )
}
export function NewPositionsTabs() {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <Row>
          <HistoryLink to="/pool">
            <StyledArrowLeft />
          </HistoryLink>
          <ActiveText>New Position</ActiveText>
        </Row>
        <Settings />
        {/* <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        /> */}
      </RowBetween>
    </Tabs>
  )
}

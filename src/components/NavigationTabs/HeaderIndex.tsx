import React, { useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const Tabs = styled.div`
  max-width: 420px;
  width: 100%;
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: flex-start;
  border-radius: 3rem;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`
const ExploreTabs = styled.div`
  max-width: 420px;
  margin: 20px 0;
  width: 100%;
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
`
const VolumeTabs = styled.div`
  margin: 10px 0;
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
`

const TabsItem = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
`

const StyledTab = styled(Link)<{
  active?: boolean
}>`
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
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text3)};
  font-size: 20px;

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
const ExploreStyledTab = styled(Link)<{
  active?: boolean
}>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  margin-right: 48px;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text3)};
  font-size: 20px;
  font-weight: 600;
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
const VolumeStyledTab = styled.div<{
  active?: boolean
}>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  padding: 10px 15px;
  border-radius: 3rem;
  border: solid 1.5px #f6f6f6;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  background-color: ${({ theme, active }) => (active ? theme.primary4 : '')};
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text3)};
  font-size: 12px;
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

//{ active }: { active: 'trade' | 'explore' }
export function HeaderTabs() {
  const { t } = useTranslation()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.pathname === '/explore' ? location.pathname : '/trade')
  const handleTabClick = (tab: any) => {
    setActiveTab(tab)
  }

  return (
    <Tabs style={{ marginLeft: '50px' }}>
      <TabsItem>
        <StyledTab active={activeTab === '/trade'} to="/trade" onClick={() => handleTabClick('/trade')}>
          {t('trade')}
        </StyledTab>
        <StyledTab active={activeTab === '/explore'} to="/explore" onClick={() => handleTabClick('/explore')}>
          {t('explore')}
        </StyledTab>
      </TabsItem>
    </Tabs>
  )
}
export function ExploreHeaderTabs({ onTabClick, stype }: any) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(stype)
  const handleTabClick = (tab: any) => {
    setActiveTab(tab)
    onTabClick(tab)
  }

  return (
    <ExploreTabs>
      <TabsItem>
        <ExploreStyledTab active={activeTab === 'Tokens'} to="/explore" onClick={() => handleTabClick('Tokens')}>
          {t('Tokens')}
        </ExploreStyledTab>
        <ExploreStyledTab active={activeTab === 'Pools'} to="/explore" onClick={() => handleTabClick('Pools')}>
          {t('Pools')}
        </ExploreStyledTab>
        <ExploreStyledTab
          active={activeTab === 'Transaction'}
          to="/explore"
          onClick={() => handleTabClick('Transaction')}
        >
          {t('Transaction')}
        </ExploreStyledTab>
      </TabsItem>
    </ExploreTabs>
  )
}

export function ExploreVolumeTabs({ onBtnClick, type }: any) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(type)
  const handleTabClick = (tab: any) => {
    setActiveTab(tab)
    onBtnClick(tab)
  }

  return (
    <VolumeTabs>
      <TabsItem>
        <VolumeStyledTab active={activeTab === 'Day'} onClick={() => handleTabClick('Day')}>
          {t('Day')}
        </VolumeStyledTab>
        <VolumeStyledTab active={activeTab === 'Week'} onClick={() => handleTabClick('Week')}>
          {t('Week')}
        </VolumeStyledTab>
        <VolumeStyledTab active={activeTab === 'Month'} onClick={() => handleTabClick('Month')}>
          {t('Month')}
        </VolumeStyledTab>
      </TabsItem>
    </VolumeTabs>
  )
}

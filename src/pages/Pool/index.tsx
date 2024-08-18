import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair } from '@uniswap/sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

// import Question from '../../components/QuestionHelper'
import FullPositionCard from '../../components/PositionCard'
// import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { TYPE } from '../../theme' //StyledInternalLink,
import { Text } from 'rebass'
import { LightCard } from '../../components/Card'
import { RowBetween } from '../../components/Row'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import AppBody from '../AppBody'
import NoDataIcon from '../../assets/images/icon_no_liquidity.png'
import { BottomGrouping, Dots } from '../../components/swap/styleds'
import { ButtonLight, ButtonPrimary } from '../../components/Button'
import { useWalletModalToggle } from '../../state/application/hooks'

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '20px')};
    width: ${({ size }) => (size ? size + 'px' : '20px')};
  }
`
const BtnItem = styled.div`
  width: 50%;
  margin: 0 0.5rem;
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  const toggleWalletModal = useWalletModalToggle()

  return (
    <>
      <SwapPoolTabs active={'pool'} />
      <AppBody>
        <AutoColumn gap="lg" justify="center">
          {/* <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to="/add/ETH">
            <Text fontWeight={500} fontSize={20}>
              Add Liquidity
            </Text>
          </ButtonPrimary> */}

          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding={'0 8px'}>
              <Text color={theme.text1} fontWeight={500}>
                Positions
              </Text>
              {/* <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." /> */}
            </RowBetween>

            {!account ? (
              <LightCard padding="40px">
                <IconWrapper size={64}>
                  <img src={NoDataIcon} alt={''} />
                </IconWrapper>
                <TYPE.body color={theme.text3} textAlign="center">
                  No liquidity found.
                </TYPE.body>
              </LightCard>
            ) : v2IsLoading ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body>
              </LightCard>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {allV2PairsWithLiquidity.map(v2Pair => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
              </>
            ) : (
              <LightCard padding="40px">
                <IconWrapper size={64}>
                  <img src={NoDataIcon} alt={''} />
                </IconWrapper>
                <TYPE.body color={theme.text3} textAlign="center">
                  No liquidity found.
                </TYPE.body>
              </LightCard>
            )}

            {/* <div>
              <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : "Don't see a pool you joined?"}{' '}
                <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                  {hasV1Liquidity ? 'Migrate now.' : 'Import it.'}
                </StyledInternalLink>
              </Text>
            </div> */}
            <BottomGrouping>
              {!account ? (
                <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
              ) : (
                <RowBetween padding={'0 8px'}>
                  <BtnItem>
                    <ButtonPrimary as={Link} style={{ padding: 12 }} to="/add/ETH">
                      New Positions
                    </ButtonPrimary>
                  </BtnItem>
                  <BtnItem>
                    <ButtonLight style={{ padding: 12 }} as={Link} to="/find">
                      {' '}
                      Import
                    </ButtonLight>
                  </BtnItem>
                </RowBetween>
              )}
            </BottomGrouping>
          </AutoColumn>
        </AutoColumn>
      </AppBody>

      {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
        <ButtonSecondary as={Link} style={{ width: 'initial' }} to="/migrate/v1">
          Migrate V1 Liquidity
        </ButtonSecondary>
      </div> */}
    </>
  )
}

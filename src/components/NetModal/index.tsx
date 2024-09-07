import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNetModalOpen, useNetModalToggle } from '../../state/application/hooks'
import { isMobile } from 'react-device-detect'
import Modal from '../Modal'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import completeIcon from '../../assets/images/complete.svg'
import { NET_CHAIN_LIST } from '../../constants/netChain'
import { useWeb3React } from '@web3-react/core'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 0 2rem 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
`
const NetName = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
`
const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '20px')};
    width: ${({ size }) => (size ? size + 'px' : '20px')};
  }
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

export default function NetModal() {
  const netModalOpen = useNetModalOpen()
  const toggleNetModal = useNetModalToggle()
  const { chainId, account } = useWeb3React()
  const [curChainId, setCurChainId] = useState(698)
  useEffect(() => {
    setCurChainId(chainId ?? 698)
  }, [chainId])
  const onHandleChangeNet = async (item: any) => {
    // console.log('params--====--', item.params)
    try {
      // const result = await window.ethereum?.request({
      //   method: 'wallet_addEthereumChain', //wallet_switchEthereumChain //wallet_addEthereumChain
      //   params: [item.params, account]
      // })
      // if (!result) {
      //   toggleNetModal()
      // }
      // window.location.reload()
      // console.log('result ----- ', result)

      const result = await window.ethereum?.request({
        method: isMobile ? 'wallet_switchEthereumChain' : 'wallet_addEthereumChain', //wallet_switchEthereumChain //wallet_addEthereumChain
        params: [item.params, account]
      })
      if (!result) {
        toggleNetModal()
      }
      window.location.reload()
      // console.log('result ----- ', result)
    } catch (error) {
      console.log('error ----- ', error)
    }
  }

  function getModalContent() {
    return (
      <UpperSection>
        <CloseIcon onClick={toggleNetModal}>
          <CloseColor />
        </CloseIcon>

        <HeaderRow>
          <HoverText>Select network</HoverText>
        </HeaderRow>

        <ContentWrapper>
          {NET_CHAIN_LIST.map((item, index) => {
            return (
              <Blurb key={index} onClick={() => onHandleChangeNet(item)}>
                <NetName>
                  <IconWrapper size={30}>
                    <img src={item.img} alt={''} />
                  </IconWrapper>
                  <span style={{ marginLeft: '15px' }}>{item.title}</span>
                </NetName>
                {item.chainId === curChainId && (
                  <IconWrapper>
                    <img src={completeIcon} alt={''} />
                  </IconWrapper>
                )}
              </Blurb>
            )
          })}
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal isOpen={netModalOpen} onDismiss={toggleNetModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLanguageModalOpen, useLanguageModalToggle } from '../../state/application/hooks'

import Modal from '../Modal'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import completeIcon from '../../assets/images/complete.svg'
import { LANGUAGE_LIST } from '../../constants/language'
import i18next from 'i18next'

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
const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '20px')};
    width: ${({ size }) => (size ? size + 'px' : '20px')};
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
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
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

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

export default function LanguageModal() {
  const languageModalOpen = useLanguageModalOpen()
  const toggleLanguageModal = useLanguageModalToggle()
  const curLang = i18next.language
  const [selectLang, setSelectLang] = useState('')
  useEffect(() => {
    setSelectLang(curLang)
  }, [curLang])

  const onHandleLang = (item: any) => {
    console.log('item ---- >', item)
    i18next.changeLanguage(item.lang)
    setSelectLang(item.lang)
  }

  function getModalContent() {
    return (
      <UpperSection>
        <CloseIcon onClick={toggleLanguageModal}>
          <CloseColor />
        </CloseIcon>

        <HeaderRow>
          <HoverText>Set Language</HoverText>
        </HeaderRow>

        <ContentWrapper>
          {LANGUAGE_LIST.map((item, index) => {
            return (
              <Blurb key={index} onClick={() => onHandleLang(item)}>
                <span>{item.name}</span>
                {selectLang === item.lang && (
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
    <Modal isOpen={languageModalOpen} onDismiss={toggleLanguageModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}

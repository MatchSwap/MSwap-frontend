import React, { useEffect } from 'react'
// import styled from 'styled-components'
import { useActivePopups, useRemovePopup } from '../../state/application/hooks'
// import { AutoColumn } from '../Column'
// import PopupItem from './PopupItem'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../state'
import ReactGA from 'react-ga'
import { acceptListUpdate } from '../../state/lists/actions'

// const MobilePopupWrapper = styled.div<{ height: string | number }>`
//   position: relative;
//   max-width: 100%;
//   height: ${({ height }) => height};
//   margin: ${({ height }) => (height ? '0 auto;' : 0)};
//   margin-bottom: ${({ height }) => (height ? '20px' : 0)}};

//   display: none;
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     display: block;
//   `};
// `

// const MobilePopupInner = styled.div`
//   height: 99%;
//   overflow-x: auto;
//   overflow-y: hidden;
//   display: flex;
//   flex-direction: row;
//   -webkit-overflow-scrolling: touch;
//   ::-webkit-scrollbar {
//     display: none;
//   }
// `

// const FixedPopupColumn = styled(AutoColumn)`
//   position: fixed;
//   top: 64px;
//   right: 1rem;
//   max-width: 355px !important;
//   width: 100%;
//   z-index: 2;

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     display: none;
//   `};
// `

export default function Popups() {
  // get all popups
  const activePopups = useActivePopups()
  console.log('activePopups -----========== ', activePopups)
  const removePopup = useRemovePopup()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (activePopups[0]) {
      const data: any = activePopups[0].content
      if ('listUpdate' in data) {
        ReactGA.event({
          category: 'Lists',
          action: 'Update List from Popup',
          label: data.listUpdate?.listUrl
        })
        dispatch(acceptListUpdate(data.listUpdate?.listUrl))
      }
      removePopup(activePopups[0].key)
    }
  }, [activePopups])

  return (
    <>
      {/* <FixedPopupColumn gap="20px">
        {activePopups.map(item => (
          <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
        ))}
      </FixedPopupColumn>
      <MobilePopupWrapper height={activePopups?.length > 0 ? 'fit-content' : 0}>
        <MobilePopupInner>
          {activePopups // reverse so new items up front
            .slice(0)
            .reverse()
            .map(item => (
              <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
            ))}
        </MobilePopupInner>
      </MobilePopupWrapper> */}
    </>
  )
}

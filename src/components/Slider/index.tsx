import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
const RangeContainer = styled.div`
  position: relative;
  width: 100%;
`
const Track = styled.div<{ value: any }>`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  border-radius: 5px;
  width: 90%;
  height: 5px;
  background: #e8e8e8; /* 未滑过的部分颜色 */
  z-index: 0;

  &::before {
    content: '';
    border-radius: 5px;
    position: absolute;
    background: #c8fc7c; /* 已滑过的部分颜色 */
    height: 100%;
    width: ${({ value }) => value + '%'};
    z-index: 1;
  }
`
const StyledRangeInput = styled.input<{ size: number }>`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background-color: ${({ theme }) => theme.primary7};
    border-radius: 100%;
    border: 2px solid ${({ theme }) => theme.primary6};
    transform: translateY(-50%);
    color: ${({ theme }) => theme.bg1};

    &:hover,
    &:focus {
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 16px 24px rgba(0, 0, 0, 0.06),
        0px 24px 32px rgba(0, 0, 0, 0.04);
    }
  }

  &::-moz-range-thumb {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background-color: ${({ theme }) => theme.primary7};
    border-radius: 100%;
    border: 2px solid ${({ theme }) => theme.primary6};
    color: ${({ theme }) => theme.bg1};

    &:hover,
    &:focus {
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 16px 24px rgba(0, 0, 0, 0.06),
        0px 24px 32px rgba(0, 0, 0, 0.04);
    }
  }

  &::-ms-thumb {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background-color: ${({ theme }) => theme.primary7};
    border-radius: 100%;
    border: 2px solid ${({ theme }) => theme.primary6};
    color: ${({ theme }) => theme.bg1};

    &:hover,
    &:focus {
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 16px 24px rgba(0, 0, 0, 0.06),
        0px 24px 32px rgba(0, 0, 0, 0.04);
    }
  }

  &::-webkit-slider-runnable-track {
    /* background: ${({ theme }) => theme.primary5}; */
    height: 5px;
    position: relative;
    z-index: 1;
  }

  &::-moz-range-track {
    height: 5px;
  }

  &::-ms-track {
    width: 100%;
    border-color: transparent;
    color: transparent;
    height: 5px;
  }
  &::-ms-fill-lower {
    background: ${({ theme }) => theme.bg5};
  }
  &::-ms-fill-upper {
    background: ${({ theme }) => theme.bg3};
  }
`

interface InputSliderProps {
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  max?: number
  size?: number
}

export default function Slider({ value, onChange, min = 0, step = 1, max = 100, size = 28 }: InputSliderProps) {
  const [changeValue, setChangeValue] = useState(value)
  useEffect(() => {
    setChangeValue(value)
  }, [value])
  const changeCallback = useCallback(
    e => {
      onChange(parseInt(e.target.value))
      setChangeValue(parseInt(e.target.value))
    },
    [onChange]
  )

  return (
    <RangeContainer>
      <Track value={changeValue} />
      <StyledRangeInput
        size={size}
        type="range"
        value={changeValue}
        style={{ width: '90%', marginLeft: 15, marginRight: 15, padding: '15px 0' }}
        onChange={changeCallback}
        aria-labelledby="input slider"
        step={step}
        min={min}
        max={max}
      />
    </RangeContainer>
  )
}

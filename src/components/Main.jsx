import React from 'react'
import styled from '@emotion/styled'
import Builder from './Builder'
import Options from './Options'
import Control from './Control'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`

const Main = () => {
  return (
    <Wrapper>
      <Builder />
      <Control />
      <Options />
    </Wrapper>
  )
}

export default Main
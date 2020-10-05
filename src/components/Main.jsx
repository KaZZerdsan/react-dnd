import React from 'react'
import styled from '@emotion/styled'
import Builder from './Builder'
import Control from './Control'
import LoadBackground from './common/LoadBackground'

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
      <LoadBackground />
    </Wrapper>
  )
}

export default Main

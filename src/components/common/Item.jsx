import React from 'react'
import styled from '@emotion/styled'
import Title from './Title'
import Value from './Value'

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  padding: 10px 24px;
  display: flex;
  box-sizing: border-box;
`

const Item = React.memo(
  props => (
    <Wrapper>
      <Title title={props.title} />
      <Value {...props} />
    </Wrapper>
  ),
  (next, prev) => next.value === prev.value
)

export default Item

import React from 'react'
import styled from '@emotion/styled'

const Label = styled.span`
  flex: 1;
  font-weight: bold;
  font-size: 22px;
`

const Title = React.memo(({ title }) => <Label>{title}</Label>)

export default Title

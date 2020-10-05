import React from 'react'
import styled from '@emotion/styled'

const Label = styled.input`
  flex: 1;
  font-size: 18px;
  max-width: 50%;
  outline: none;
`

const shouldRender = (prev, next) =>
  prev.title === next.title && prev.value === next.value

const Value = React.memo(
  ({ title, type, min, max, value, onChange }) => (
    <Label
      type={type}
      min={min}
      max={max}
      defaultValue={value}
      onChange={e => onChange(title, e)}
    />
  ),
  shouldRender
)

export default Value

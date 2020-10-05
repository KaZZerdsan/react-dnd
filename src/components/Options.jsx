import React from 'react'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'
import { editShapeSelector } from '../store'
import Item from './common/Item'

const Wrapper = styled.div`
  width: 300px;
  height: 100%;
  border-left: 1px solid #CCC;
`

const Options = () => {
  const [shape, editShape] = useRecoilState(editShapeSelector)

  const handleChange = (attr, event) => {
    event.persist()
    editShape({...shape, [attr]: event.target.value})
  } 

  return (
    <Wrapper>
      {shape && (
        <>
          <Item title='width' value={shape.width} onChange={handleChange}/>
          <Item title='height' value={shape.height} onChange={handleChange}/>
          <Item title='x' value={shape.x} onChange={handleChange}/>
          <Item title='y' value={shape.y} onChange={handleChange}/>
          <Item title='color' value={shape.color} onChange={handleChange}/>
        </>
      )}
    </Wrapper>
  )
}

export default Options
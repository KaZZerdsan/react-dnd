import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { editShapeSelector, shapesAtom } from '../store'

const Wrapper = styled.div`
  width: calc(100% - 602px);
  height: 100%;
  position: relative;
`

const Figure = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: ${props => props.color};
`

const Control = () => {
  const setShape = useSetRecoilState(editShapeSelector)
  const shapes = useRecoilValue(shapesAtom)
  const [label] = useState(document.createElement('span'))

  const handleDrag = (shape, e) => {
    e.persist()
    const {pageX, pageY} = e
    setShape({...shape, x: pageX - 300, y: pageY, selected: true})
  }

  const handleDragStart = e => {
    e.persist()
    e.dataTransfer.setDragImage(label, 0, 0)
  }

  return (
    <Wrapper>
      {shapes.map(shape => (
        <Shape
          shape={shape}
          key={shape.id.toString()}
          onDragStart={handleDragStart}
          onDrag={e => handleDrag(shape, e)}
          onDragEnd={e => handleDrag(shape, e)}
        />
      ))}
    </Wrapper>
  )
}

const Shape = React.memo((props) => (
  <Figure
    draggable {...props.shape}
    onDragStart={props.onDragStart}
    onDrag={props.onDrag}
    onDragEnd={props.onDragEnd}
  />
), (prev, next) => 
  prev.shape.x === next.shape.x &&
  prev.shape.y === next.shape.y &&
  prev.shape.width === next.shape.width &&
  prev.shape.height === next.shape.height &&
  prev.shape.color === next.shape.color)

export default Control
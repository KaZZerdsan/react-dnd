import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import {
  addShapeSelector,
  backgroundImageAtom,
  editShapeSelector,
  selectShapeSelector,
  shapesAtom,
} from '../store'

const Wrapper = styled.div`
  width: 100%;
  max-width: calc(100vw - 300px);
  height: 100%;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
`

const Figure = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: ${props => props.color};
  box-shadow: ${props =>
    props.selected ? 'inset 0 0 0px 2px #76ab6e' : 'none'};
  border-radius: 50%;
`

const Control = () => {
  const bgImage = useRecoilValue(backgroundImageAtom)
  const shapes = useRecoilValue(shapesAtom)
  const selectShape = useSetRecoilState(selectShapeSelector)
  const addShape = useSetRecoilState(addShapeSelector)
  const [selectedShape, setShape] = useRecoilState(editShapeSelector)
  const [label] = useState(document.createElement('span'))

  const moveShape = useCallback(
    e => {
      if (selectedShape) {
        switch (e.code) {
          case 'ArrowUp':
            setShape({ ...selectedShape, y: selectedShape.y - 1 })
            break
          case 'ArrowDown':
            setShape({ ...selectedShape, y: selectedShape.y + 1 })
            break
          case 'ArrowRight':
            setShape({ ...selectedShape, x: selectedShape.x + 1 })
            break
          case 'ArrowLeft':
            setShape({ ...selectedShape, x: selectedShape.x - 1 })
            break
          default:
            break
        }
      }
    },
    [selectedShape, setShape]
  )

  useEffect(() => {
    document.addEventListener('keydown', moveShape)
    return () => document.removeEventListener('keydown', moveShape)
  }, [selectedShape, moveShape])

  const getCoordinates = e => {
    e.persist && e.persist()
    let { pageX, pageY } = e
    if (pageX < 310) pageX = 310
    return { x: pageX - 310, y: pageY - 10 }
  }

  const handleDrag = useCallback(
    (shape, e) => {
      const coordinates = getCoordinates(e)
      setShape({ ...shape, ...coordinates })
    },
    [setShape]
  )

  const handleDragStart = (shape, e) => {
    e.persist()
    e.dataTransfer.setDragImage(label, 0, 0)
    selectShape(shape.id)
  }

  const handleShapeCreate = e => {
    const coordinates = getCoordinates(e)
    addShape(coordinates)
  }

  const handleClick = (e, id) => {
    e.stopPropagation()
    selectShape(id)
  }

  return (
    <Wrapper background={bgImage} onClick={handleShapeCreate}>
      {shapes.map(shape => (
        <Shape
          shape={shape}
          onClick={e => handleClick(e, shape.id)}
          key={shape.id.toString()}
          onDragStart={e => handleDragStart(shape, e)}
          onDrag={e => handleDrag(shape, e)}
          onDragEnd={e => handleDrag(shape, e)}
        />
      ))}
    </Wrapper>
  )
}

const Shape = React.memo(
  props => (
    <Figure
      {...props.shape}
      draggable
      onClick={props.onClick}
      onDragStart={props.onDragStart}
      onDrag={props.onDrag}
      onDragEnd={props.onDragEnd}
    />
  ),
  (prev, next) =>
    prev.shape.x === next.shape.x &&
    prev.shape.y === next.shape.y &&
    prev.shape.width === next.shape.width &&
    prev.shape.height === next.shape.height &&
    prev.shape.selected === next.shape.selected &&
    prev.shape.color === next.shape.color
)

export default Control

import React, { useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { SketchPicker } from 'react-color'
import { editShapeSelector, selectShapeSelector } from '../store'
import { useSetRecoilState } from 'recoil'

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  border: 2px solid ${props => (props.selected ? '#5c59ff' : '#e6e6e6')};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 25px;
  cursor: pointer;
  display: flex;
`

const ID = styled.span`
  color: #8e8e8e;
`

const ColorPreview = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 10px;
  background: ${props => props.color};
`

const CustomPicker = styled.input`
  border-radius: 3px;
  height: 16px;
  outline: none;
  border: 2px solid #e8e8e8;
`

const ColorPickerWrapper = styled.div`
  position: absolute;
  outline: none;
`

const Shape = React.memo(props => {
  const [open, setOpen] = useState(false)
  const selectShape = useSetRecoilState(selectShapeSelector)
  const setShape = useSetRecoilState(editShapeSelector)
  const ref = useRef()

  const handleSelect = useCallback(
    shape => {
      if (!shape.selected) selectShape(shape.id)
    },
    [selectShape]
  )

  const handleChange = useCallback(
    (shape, attr, value) => {
      setShape({ ...shape, [attr]: value })
    },
    [setShape]
  )

  const handleOpen = useCallback(() => {
    setOpen(true)
    setTimeout(() => ref.current && ref.current.focus(), 1)
  }, [ref, setOpen])

  const handleClose = useCallback(() => {
    setTimeout(() => {
      if (!ref.current.contains(document.activeElement)) setOpen(false)
    }, 1)
  }, [ref, setOpen])

  return (
    <Wrapper selected={props.selected} onClick={() => handleSelect(props)}>
      <ID>{props.id}</ID>
      <ColorPreview color={props.color} />
      <CustomPicker defaultValue={props.color} onFocus={handleOpen} />
      {open && (
        <ColorPickerWrapper tabIndex={999} ref={ref} onBlur={handleClose}>
          <SketchPicker
            color={props.color}
            onChange={e => handleChange(props, 'color', e.hex)}
          />
        </ColorPickerWrapper>
      )}
    </Wrapper>
  )
})

export default Shape

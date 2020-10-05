import React from 'react'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'
import Shape from './Shape'
import { addShapeSelector } from '../store'

const Wrapper = styled.div`
  width: 300px;
  height: 100%;
  border-right: 1px solid #CCC;
`

const Header = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #CCC;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.span`
  margin-right: 15px;
`

const AddButton = styled.button`
  user-select: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  outline: none;
  background: none;
  border: 1px solid #f900c3;
  color: #f900c3;
  font-size: 26px;
  line-height: 26px;
  transition: .2s ease-in-out;
  cursor: pointer;
  &:hover {
    border: 1px solid #fff;
    background: #f900c3;
    color: white;
  }
`

const ShapeList = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 15px 10px;
  box-sizing: border-box;
`

const Builder = () => {
  const [shapes, addShape] = useRecoilState(addShapeSelector)
  return (
    <Wrapper>
      <Header>
        <Title>Header</Title>
        <AddButton onClick={addShape}>+</AddButton>
      </Header>
      <ShapeList>
        {shapes.map(shape => (
          <Shape key={shape.id.toString()} {...shape} />
        ))}
      </ShapeList>
    </Wrapper>
  )
}

export default Builder
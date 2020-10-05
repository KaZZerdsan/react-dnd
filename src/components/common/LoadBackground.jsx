import React from 'react'
import { useRecoilState } from 'recoil'
import styled from '@emotion/styled'
import { ReactComponent as PictureIcon } from '../../assets/image.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg'
import { backgroundImageAtom } from '../../store'

const RemoveButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border: none;
  outline: none;
  background: #ff4040;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #ec2f2f;
  }
  & > svg {
    width: 70%;
    height: 70%;
  }
`

const UploadButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border: none;
  outline: none;
  background: #ffad84;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #fb9a6a;
  }
  & > svg {
    width: 70%;
    height: 70%;
  }
`

const LoadBackground = () => {
  const [image, setImage] = useRecoilState(backgroundImageAtom)

  const handleClick = e => {
    const btn = document.createElement('input')
    btn.type = 'file'
    btn.onchange = handleImageChange
    btn.click()
  }

  const handleImageChange = e => {
    const [target] = e.path
    const [file] = target.files
    setImage(URL.createObjectURL(file))
  }

  const removeBackground = () => {
    setImage('')
  }

  return !image ? (
    <UploadButton onClick={handleClick}>
      <PictureIcon />
    </UploadButton>
  ) : (
    <RemoveButton onClick={removeBackground}>
      <DeleteIcon />
    </RemoveButton>
  )
}

export default LoadBackground

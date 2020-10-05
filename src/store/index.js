import { atom, selector } from 'recoil'
import { DEFAULT_SHAPE_STATE } from '../constants'

export const shapesAtom = atom({
  key: 'shapesAtom',
  default: [],
})

export const addShapeSelector = selector({
  key: 'addShapeSelector',
  get: ({ get }) => get(shapesAtom),
  set: ({ get, set }, coordinates = {}) => {
    const newShape = Object.assign(
      {},
      { ...DEFAULT_SHAPE_STATE, ...coordinates }
    )
    const _oldShapes = JSON.parse(JSON.stringify(get(shapesAtom)))
    if (_oldShapes.length < 1) {
      newShape.id = 1
    } else {
      newShape.id = _oldShapes[_oldShapes.length - 1].id + 1
    }
    _oldShapes.push(newShape)
    set(shapesAtom, _oldShapes)
  },
})

export const removeShapeSelector = selector({
  key: 'removeShapeSelector',
  set: ({ get, set }, shape) => {
    const _oldShapes = get(shapesAtom)
    set(
      shapesAtom,
      _oldShapes.filter(item => item.id !== shape.id)
    )
  },
})

export const selectShapeSelector = selector({
  key: 'selectShapeSelector',
  set: ({ get, set }, id) => {
    let shapes = JSON.parse(JSON.stringify(get(shapesAtom)))
    shapes = shapes.map(shape => {
      shape.selected = shape.id === id
      return shape
    })
    set(shapesAtom, shapes)
  },
})

export const editShapeSelector = selector({
  key: 'editShapeSelector',
  get: ({ get }) => get(shapesAtom).find(shape => shape.selected),
  set: ({ get, set }, shape) => {
    let shapes = JSON.parse(JSON.stringify(get(shapesAtom)))
    const index = shapes.findIndex(oldShape => oldShape.id === shape.id)
    shapes[index] = shape
    set(shapesAtom, shapes)
  },
})

export const backgroundImageAtom = atom({
  key: 'backgroundImageAtom',
  default: '',
})

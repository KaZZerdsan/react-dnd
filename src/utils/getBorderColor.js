export default color => {
  const MAX = 16777215
  if (color.startsWith('#')) {
    color = color.substr(1)
  }
  const prev = Number(`0x${color}`)
  return `#${(MAX - prev).toString(16)}`
}

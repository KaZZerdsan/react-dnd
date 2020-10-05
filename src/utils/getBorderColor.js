export default color => {
  const MAX = 0xffffff
  const prev = `0x${color.substr(1)}`
  return `#${(MAX - prev).toString(16)}`
}

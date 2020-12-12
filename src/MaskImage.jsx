import { h } from 'preact'

const MaskImage = props => {
  const style = {
    width: props.width,
    height: props.height,
    maskImage: `url(${props.image})`,
    WebkitMaskImage: `url(${props.image})`,
    background: props.color
  }
  return <div style={style}></div>
}

export default MaskImage

import * as React from 'react'
import HSLPicker from './HSLPicker'
import MaskImage from './MaskImage'

const Arrow = props => {
  const [selected, setSelected] = React.useState(false)

  const color = props.color
  const gradient = `linear-gradient(to right, ${color}, ${props.middleColor}, ${color})`

  const wrapper = {
    style: {
      position: 'relative'
    },
    onClick: () => setSelected(true)
  }

  const arrow = {
    width: props.width,
    height: props.height,
    color: props.defaultColorgrd ? gradient : color,
    image: props.image,
  }

  const popover = {
    style: {
      display: selected ? 'inline-block' : 'none',
      position: 'absolute',
      zIndex: 2
    }
  }

  const picker = {
    color: props.color,
    onChange: color => props.onColorChange(color)
  }

  const cover = {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    onClick: e => {
      setSelected(false)
      e.stopPropagation()
    }
  }

  return (
    <div {...wrapper}>
      <MaskImage {...arrow}/>
      <div {...popover}>
        <div {...cover}/>
      </div>
      <div {...popover}>
        <HSLPicker {...picker}/>
      </div>
    </div>
  )
}

export default Arrow

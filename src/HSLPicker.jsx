import * as React from 'react'
import Slider from './Slider'
import tinycolor from 'tinycolor2'

export default class HSLPicker extends React.Component {
  constructor(props) {
    super(props)
    const hsl = tinycolor(props.color).toHsl()
    this.state = hsl
  }

  setHSL(h, s, l) {
    const hsl = {h: h, s: s, l: l}
    this.props.onChange(tinycolor(hsl).toHexString())
    this.setState(hsl)
  }

  render() {
    const hex = tinycolor(this.state).toHexString()
    if (hex != this.props.color) {
      this.setState(tinycolor(this.props.color).toHsl())
    }

    const [h, s, l] = [this.state.h, this.state.s, this.state.l]
    const s0 = tinycolor({h: h, s: 0, l: l}).toHexString()
    const s1 = tinycolor({h: h, s: 1, l: l}).toHexString()
    const l0 = tinycolor({h: h, s: s, l: 0}).toHexString()
    const l05 = tinycolor({h: h, s: s, l: 0.5}).toHexString()
    const l1 = tinycolor({h: h, s: s, l: 1}).toHexString()
  
    const hueBg = 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
    const saturationBg = `linear-gradient(to right, ${s0}, ${s1})`
    const lightnessBg = `linear-gradient(to right, ${l0}, ${l05}, ${l1})`

    const picker = {
      style: {
        background: '#f0f0f0',
        padding: 10,
        boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)'
      }
    }

    const sliderWrapper = {
      style: {
        display: 'flex'
      }
    }

    const textbox = {
      style: {
        width: 32,
        height: 16,
        marginLeft: 10,
        paddingRight: 2,
        border: '1px solid #cccccc',
        textAlign: 'right'
      }
    }

    return (
      <div {...picker}>
        <div {...sliderWrapper}>
          <Slider value={h / 360} background={hueBg} onChange={h => this.setHSL(h * 360, s, l)}/>
          <input type="text" value={h.toFixed(0)} {...textbox} onChange={e => this.setHSL(Number(e.target.value), s, l)}/>
        </div>
        <div {...sliderWrapper}>
          <Slider value={s} background={saturationBg} onChange={s => this.setHSL(h, s, l)}/>
          <input type="text" value={(s * 100).toFixed(0)} {...textbox} onChange={e => this.setHSL(h, Number(e.target.value) / 100, l)}/>
        </div>
        <div {...sliderWrapper}>
          <Slider value={l} background={lightnessBg} onChange={l => this.setHSL(h, s, l)}/>
          <input type="text" value={(l * 100).toFixed(0)} {...textbox} onChange={e => this.setHSL(h, s, Number(e.target.value) / 100)}/>
        </div>
      </div>
    )
  }
}

import { h, Component } from 'preact'
import Slider from './Slider'
import tinycolor from 'tinycolor2'

export default class HSLPicker extends Component {
  constructor(props) {
    super(props)
    const hsl = tinycolor(props.color).toHsl()
    this.state = hsl
  }

  setHSL(hue, saturation, lightness) {
    const hsl = {h: hue, s: saturation, l: lightness}
    this.props.onChange(tinycolor(hsl).toHexString())
    this.setState(hsl)
  }

  render() {
    const hexState = tinycolor(this.state).toHexString()
    const hexProps = tinycolor(this.props.color).toHexString()
    if (hexState !== hexProps) {
      const hsl = tinycolor(hexProps).toHsl()
      this.setHSL(hsl.h, hsl.s, hsl.l)
    }

    const [hue, saturation, lightness] = [this.state.h, this.state.s, this.state.l]
    const s0 = tinycolor({h: hue, s: 0, l: lightness}).toHexString()
    const s1 = tinycolor({h: hue, s: 1, l: lightness}).toHexString()
    const l0 = tinycolor({h: hue, s: saturation, l: 0}).toHexString()
    const l05 = tinycolor({h: hue, s: saturation, l: 0.5}).toHexString()
    const l1 = tinycolor({h: hue, s: saturation, l: 1}).toHexString()
  
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
          <Slider value={hue / 360} background={hueBg} onChange={val => this.setHSL(val * 360, saturation, lightness)}/>
          <input type="text" value={hue.toFixed(0)} {...textbox} onChange={e => this.setHSL(Number(e.target.value), saturation, lightness)}/>
        </div>
        <div {...sliderWrapper}>
          <Slider value={saturation} background={saturationBg} onChange={val => this.setHSL(hue, val, lightness)}/>
          <input type="text" value={(saturation * 100).toFixed(0)} {...textbox} onChange={e => this.setHSL(hue, Number(e.target.value) / 100, lightness)}/>
        </div>
        <div {...sliderWrapper}>
          <Slider value={lightness} background={lightnessBg} onChange={val => this.setHSL(hue, saturation, val)}/>
          <input type="text" value={(lightness * 100).toFixed(0)} {...textbox} onChange={e => this.setHSL(hue, saturation, Number(e.target.value) / 100)}/>
        </div>
      </div>
    )
  }
}

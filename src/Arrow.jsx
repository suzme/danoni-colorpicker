import { h, Component } from 'preact'
import HSLPicker from './HSLPicker'
import MaskImage from './MaskImage'

export default class Arrow extends Component {
  constructor(props) {
    super(props)
    this.state = {selected: false}
  }

  render() {
    const color = this.props.color
    const gradient = `linear-gradient(to right, ${color}, ${this.props.middleColor}, ${color})`
  
    const wrapper = {
      style: {
        position: 'relative'
      },
      onClick: () => this.setState({selected: true})
    }
  
    const arrow = {
      width: this.props.width,
      height: this.props.height,
      color: this.props.defaultColorgrd ? gradient : color,
      image: this.props.image,
    }
  
    const popover = {
      style: {
        display: this.state.selected ? 'inline-block' : 'none',
        position: 'absolute',
        zIndex: 2
      }
    }
  
    const picker = {
      color: this.props.color,
      onChange: color => this.props.onColorChange(color)
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
        this.setState({selected: false})
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
}

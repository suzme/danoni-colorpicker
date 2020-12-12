import { h, Component, createRef } from 'preact'

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDragging: false
    }

    this.myRef = createRef()

    this.mouseUp = this.mouseUp.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.mouseUp)
    document.body.addEventListener('mousemove', this.mouseMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.mouseUp)
    document.body.removeEventListener('mousemove', this.mouseMove)
  }

  drag(x) {
    const left = this.myRef.current.getBoundingClientRect().left
    const value = (x - left) / (this.props.width || 200)
    this.props.onChange(Math.max(0, Math.min(1, value)))
  }

  mouseDown(e) {
    this.state.isDragging = true
    this.drag(e.clientX)
  }

  mouseUp() {
    this.state.isDragging = false
  }

  mouseMove(e) {
    if (this.state.isDragging) {
      this.drag(e.clientX)
    }
  }

  render() {
    const slider = {
      ref: this.myRef,
      onMouseDown: this.mouseDown,
      style: {
        position: 'relative',
        background: this.props.background || '#666666',
        width: this.props.width || 200,
        height: this.props.height || 16,
        marginBottom: 4
      }
    }
  
    const handle = {
      style: {
        background: '#ffffff',
        boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        left: Math.floor((this.props.value * slider.style.width) - (slider.style.height / 2)),
        width: slider.style.height,
        height: slider.style.height
      }
    }  

    return (
      <div {...slider}>
        <div {...handle}></div>
      </div>
    )
  }
}

import { h, Component } from 'preact'
import Arrow from './Arrow'
import Package from '../package.json'

const defaultMiddleColor = '#eeeeee'
const defaultColors = ['#6666ff', '#99ffff', '#ffffff', '#ffff99', '#ff9966']

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultColorgrd: false,
      colors: ['#cccccc', '#3277ff', '#ffffff', '#ff3284', '#d632ff'],
      middleColor: '#eeeeee',
      dosStr: ''
    }

    this.copy = this.copy.bind(this)
    this.generateDosStr = this.generateDosStr.bind(this)
    this.defaultColorgrdChange = this.defaultColorgrdChange.bind(this)
    this.dosBlur = this.dosBlur.bind(this)
  }

  render() {
    if (this.state.dosStr === '') {
      this.setState({
        dosStr: this.generateDosStr(this.state.colors, this.state.defaultColorgrd)
      })
    }

    const arrows = this.state.colors.map((color, index) => {
      const props = {
        key: index,
        image: index === 2 ? './onigiri.svg' : './arrow.svg',
        color: color,
        middleColor: this.state.middleColor,
        width: 48,
        height: 48,
        defaultColorgrd: this.state.defaultColorgrd,
        onColorChange: color => {
          const colorsCopy = this.state.colors.slice()
          colorsCopy[index] = color
          this.setState({
            colors: colorsCopy,
            dosStr: this.generateDosStr(colorsCopy, this.state.defaultColorgrd)
          })
        }
      }
      return <Arrow {...props}/>
    })

    return (
      <div className="App">
        <div className="arrows">
          {arrows}
        </div>
        <div>
          <input id="gradient" type="checkbox" onChange={this.defaultColorgrdChange} checked={this.state.defaultColorgrd}/>
          <label htmlFor="gradient" className="checkboxLabel">グラデーション(defaultColorgrd)</label>
        </div>
        <textarea id='dos' value={this.state.dosStr} onBlur={this.dosBlur}/>
        <div>
          <input type="button" value="コピー" onClick={this.copy}/>
        </div>
        <div className="footer">
          <a href="https://github.com/suzme/danoni-colorpicker">{Package.name}@{Package.version}</a><br/>
          <a href="THIRD_PARTY_NOTICES.TXT">オープンソースライセンスを表示</a>
        </div>
      </div>
    );
  }

  copy() {
    navigator.clipboard.writeText(this.state.dosStr)
  }

  generateDosStr(colors, defaultColorgrd) {
    const defaultColorgrdStr = defaultColorgrd.toString()
    + ((this.state.middleColor === defaultMiddleColor) ? '' : ',' + this.state.middleColor)

    return `|setColor=${colors.join(',')}|\n`
         + `|defaultColorgrd=${defaultColorgrdStr}|`
  }

  defaultColorgrdChange(e) {
    this.setState({
      defaultColorgrd: e.target.checked,
      dosStr: this.generateDosStr(this.state.colors, e.target.checked)
    })
  }

  dosBlur(e) {
    const dosObj = Object.fromEntries(
      e.target.value
        .replace(/\r|\n/g,'')
        .split(/&|\|/)
        .filter(a => a.indexOf('=') > -1)
        .map(a => a.split('='))
    )

    if (dosObj.setColor) {
      const newColors = dosObj.setColor.split(',').map(c => c.replace(/^0x/, '#'))
      for (let i = newColors.length; i < defaultColors.length; i++) {
        newColors.push(defaultColors[i])
      }
      this.setState({
        colors: newColors
      })
    }

    if (dosObj.defaultColorgrd) {
      const [newDefaultColorgrd, newMiddleColor] = dosObj.defaultColorgrd.split(',')
      this.setState({
        defaultColorgrd: newDefaultColorgrd === 'true',
        middleColor: newMiddleColor || defaultMiddleColor
      })
    }
  }
}

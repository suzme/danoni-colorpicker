import * as React from 'react'
import Arrow from './Arrow'
import Package from '../package.json'

const defaultMiddleColor = '#eeeeee'
const defaultColors = ['#6666ff', '#99ffff', '#ffffff', '#ffff99', '#ff9966']

const App = () => {
  const [defaultColorgrd, setDefaultColorgrd] = React.useState(false)
  const [colors, setColors] = React.useState(['#cccccc', '#3277ff', '#ffffff', '#ff3284', '#d632ff'])
  const [middleColor, setMiddleColor] = React.useState('#eeeeee')
  const [dosStr, setDosStr] = React.useState('')

  const generateDosStr = (colors, defaultColorgrd) => {
    const defaultColorgrdStr = defaultColorgrd.toString()
    + ((middleColor === defaultMiddleColor) ? '' : ',' + middleColor)

    return `|setColor=${colors.join(',')}|\n`
         + `|defaultColorgrd=${defaultColorgrdStr}|`
  }

  if (dosStr === '') {
    setDosStr(generateDosStr(colors, defaultColorgrd))
  }

  const arrows = colors.map((color, index) => {
    const props = {
      key: index,
      image: index === 2 ? './onigiri.svg' : './arrow.svg',
      color: color,
      middleColor: middleColor,
      width: 48,
      height: 48,
      defaultColorgrd: defaultColorgrd,
      onColorChange: color => {
        const colorsCopy = colors.slice()
        colorsCopy[index] = color
        setColors(colorsCopy)
        setDosStr(generateDosStr(colorsCopy, defaultColorgrd))
      }
    }
    return <Arrow {...props}/>
  })

  const defaultColorgrdChange = e => {
    setDefaultColorgrd(e.target.checked)
    setDosStr(generateDosStr(colors, e.target.checked))
  }

  const copy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = dos
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  const dosChange = e => {
    setDosStr(e.target.value)
  }

  const dosBlur = e => {
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
      setColors(newColors)
    }

    if (dosObj.defaultColorgrd) {
      const [newDefaultColorgrd, newMiddleColor] = dosObj.defaultColorgrd.split(',')
      setDefaultColorgrd(newDefaultColorgrd === 'true')
      if (newMiddleColor) {
        setMiddleColor(newMiddleColor)
      }
    }
  }

  return (
    <div className="App">
      <div className="arrows">
        {arrows}
      </div>
      <div>
        <input id="gradient" type="checkbox" onChange={defaultColorgrdChange} checked={defaultColorgrd}/>
        <label htmlFor="gradient" className="checkboxLabel">グラデーション(defaultColorgrd)</label>
      </div>
      <textarea id='dos' value={dosStr} onChange={dosChange} onBlur={dosBlur}/>
      <div>
        <input type="button" value="コピー" onClick={copy}/>
      </div>
      <div className="footer">
        <a href="https://github.com/suzme/danoni-colorpicker">{Package.name}@{Package.version}</a><br/>
        <a href="THIRD_PARTY_NOTICES.TXT">オープンソースライセンスを表示</a>
      </div>
    </div>
  );
}

export default App;

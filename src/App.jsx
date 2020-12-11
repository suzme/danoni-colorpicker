import * as React from 'react'
import Arrow from './Arrow'
import Package from '../package.json'

const App = () => {
  const [defaultColorgrd, setDefaultColorgrd] = React.useState(false)
  const [colors, setColors] = React.useState(['#cccccc', '#3277ff', '#ffffff', '#ff3284', '#d632ff'])

  const arrows = colors.map((color, index) => {
    const props = {
      key: index,
      image: index === 2 ? './onigiri.svg' : './arrow.svg',
      color: color,
      width: 48,
      height: 48,
      defaultColorgrd: defaultColorgrd,
      onColorChange: color => {
        const colorsCopy = colors.slice()
        colorsCopy[index] = color
        setColors(colorsCopy)
      }
    }
    return <Arrow {...props}/>
  })

  const dos = `|setColor=${colors.join(',')}|\n`
    + `|defaultColorgrd=${defaultColorgrd.toString()}|`

  const copy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = dos
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  return (
    <div className="App">
      <div className="arrows">
        {arrows}
      </div>
      <div>
        <input id="gradient" type="checkbox" onChange={e => setDefaultColorgrd(e.target.checked)}/>
        <label htmlFor="gradient" className="checkboxLabel">グラデーション(defaultColorgrd)</label>
      </div>
      <div id="dos">{dos}</div>
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

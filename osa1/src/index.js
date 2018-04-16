import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}
const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.a} teht={props.b} />
      <Osa osa={props.c} teht={props.d} />
      <Osa osa={props.e} teht={props.f} />
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.tehtavia} tehtävää</p>
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.osa} {props.teht}</p>
    </div>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
   <div>
     <Otsikko kurssi={kurssi} />
     <Sisalto a={osa1} b={tehtavia1} c={osa2} d={tehtavia2} e={osa3} f={tehtavia3}/>
     <Yhteensa tehtavia={tehtavia1 + tehtavia2 + tehtavia3} />
   </div>
 )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

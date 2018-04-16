import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi.nimi}</h1>
    </div>
  )
}
const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.taulukko[0].nimi} teht={props.taulukko[0].tehtavia} />
      <Osa osa={props.taulukko[1].nimi} teht={props.taulukko[1].tehtavia} />
      <Osa osa={props.taulukko[2].nimi} teht={props.taulukko[2].tehtavia} />
  </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.taulukko[0].tehtavia + props.taulukko[1].tehtavia + props.taulukko[2].tehtavia} tehtävää</p>
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
  const kurssi = {
     nimi: 'Half Stack -sovelluskehitys',
     osat: [
       {
         nimi: 'Reactin perusteet',
         tehtavia: 10
       },
       {
         nimi: 'Tiedonvälitys propseilla',
         tehtavia: 7
       },
       {
         nimi: 'Komponenttien tila',
         tehtavia: 14
       }
     ]
   }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto taulukko={kurssi.osat} />
      <Yhteensa taulukko={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

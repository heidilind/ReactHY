import React from 'react'

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.otsikko}</h1>
    </div>
  )
}
const Sisalto = (props) => {
  const osat  = props.sisalto
  return (
    <div>
      {osat.map(osa=><Osa key={osa.id} osa={osa.nimi} teht={osa.tehtavia} />)}
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

const Kurssi = (props) => {
  const osat = props.kurssi.osat
  return (
    <div>
      <Otsikko otsikko={props.kurssi.nimi} />
      <Sisalto sisalto={osat} />
      <Yhteensa taulukko={osat} />
    </div>
  )
}

const Yhteensa = (props) => {
  const osat = props.taulukko
  const tehdyt = osat.reduce(function(sum, osa) {
    return sum + osa.tehtavia
  }, 0)
  return (
    <div>
      <p>yhteensä {tehdyt} tehtävää</p>
    </div>
  )
}

export default Kurssi

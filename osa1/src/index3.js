import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({txt1, pist1, txt2, pist2, txt3, pist3, txt4, pist4, txt5, pist5}) => {
  return (
    <table>
      <tbody>
          <Statistic header={txt1} value={pist1} />
          <Statistic header={txt2} value={pist2} />
          <Statistic header={txt3} value={pist3} />
          <Statistic header={txt4} value={pist4} />
          <Statistic header={txt5} value={pist5} />
      </tbody>
    </table>
  )
}

const Statistic = ({header, value}) => {
  return (
    <tr>
      <td>{header} {value}</td>
    </tr>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  klik = (state) => () => {
    this.setState(state)
  }


  keskiarvo = () => {
    const kaikki = this.state.hyva + this.state.neutraali + this.state.huono
    if (kaikki === 0) {
      return 0.0
    }
    const ka = (this.state.hyva + this.state.huono*(-1))/kaikki
    return ka.toFixed(1)
  }

  positiivisia = () => {
    const kaikki = this.state.hyva + this.state.neutraali + this.state.huono
    if (kaikki === 0) {
      return 0.0
    }
    return ((this.state.hyva/kaikki)*100).toFixed(1)
  }

  render() {
    const stats = () => {
      if (this.state.hyva + this.state.neutraali + this.state.huono === 0 ) {
        return (
          <div>
            <p>ei yhtään palautetta annettu</p>
          </div>
        )
      }
      return (
        <Statistics
         txt1={'hyvä'} pist1={this.state.hyva}
         txt2={'neutraali'} pist2={this.state.neutraali}
         txt3={'huono'} pist3={this.state.huono}
         txt4={'keskiarvo'} pist4={this.keskiarvo()}
         txt5={'positiivisia'} pist5={`${this.positiivisia()} %`}
         />
      )

    }
    return (
      <div>
        <Otsikko text={'anna palautetta'} />
        <div>
          <Button handleClick={this.klik({ hyva: this.state.hyva + 1 })} text={'hyva'} />
          <Button handleClick={this.klik({ neutraali: this.state.neutraali + 1 })} text={'neutraali'} />
          <Button handleClick={this.klik({ huono: this.state.huono + 1 })} text={'huono'} />
        </div>
        <Otsikko text={'statistiikka'} />
          <div>{stats()}</div>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)

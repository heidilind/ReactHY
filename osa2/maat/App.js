import React from 'react'
import axios from 'axios'

const CountryInfo = (props) => {
  return (
    <table>
      <tbody>
        {props.countries.map(c =>
          <tr key={c.name}>
            <td onClick={ props.updateFunction(c)}>{c.name}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const Country = (props) => {
  return (
    <div>
      <h2>{props.name} {props.nativeName}</h2>
      <p>capital: {props.capital}</p>
      <img src={props.flag} alt="Flag" height="100" />
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
      axios
        .get('http://restcountries.eu/rest/v2/all')
        .then(response => {
          this.setState({ countries: response.data })
        })
  }

  handleFilterChange = (event) => {
      this.setState({ filter: event.target.value})
  }

  filterCountries = (countriesList) => countriesList.filter(c => this.parseFilterWord(c.name))

  parseFilterWord = (word) => word.toUpperCase().includes(this.state.filter.toUpperCase().trim())

  showOneCountry = (country) => () => {
    console.log('updateFunction', country)
    this.setState({ countries: [country]})
  }

  render() {
    const countriesToShow =
      this.state.filter === '' ?
      [] :
      this.filterCountries(this.state.countries)

    const countryView = () => {
      if (countriesToShow.length > 10) {
        return (
          <div> too many matches, specify another filter </div>
        )
      } else if (countriesToShow.length === 1) {
        const country = countriesToShow.pop()
        return (
            <Country name={country.name} nativeName={country.nativeName} capital={country.capital} flag={country.flag} />
        )
      } else {
        return (
            <CountryInfo countries={countriesToShow} updateFunction={this.showOneCountry}/>
        )
      }
    }

    return (
      <div>
        <div>
          find countries:
          <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <div>{countryView()}</div>
      </div>
    )
  }
}

export default App

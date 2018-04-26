import React from 'react'
import axios from 'axios'

const PersonInfo = ({persons}) => {
  return (
    <table>
      <tbody>
          {persons.map(p =>
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.number}</td>
            </tr>
        )}
      </tbody>
    </table>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.add}>
      <div>
        nimi:
        <input
          value={props.name}
          onChange={props.nameChange}
        />
      </div>
      <div>
        numero:
        <input
          value={props.number}
          onChange={props.numberChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
 )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
      this.setState({ filter: event.target.value})
  }

  addPerson = (event) => {
    event.preventDefault()
    const isNewPerson = this.state.persons.every(p => p.name !== this.state.newName)
    if (isNewPerson) {
      const persons = this.state.persons.concat(
        {
          name: this.state.newName,
          number: this.state.newNumber
        })
      this.setState({
        persons,
        newName: ''
      })
    }
    this.setState({newName: '', newNumber: ''})
  }

  parseFilterWord = (word) => word.toUpperCase().includes(this.state.filter.toUpperCase().trim())

  componentDidMount() {
      console.log('will mount')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          this.setState({ persons: response.data })
        })
  }

  render() {
    const personsToShow =
      this.state.filter === '' ?
      this.state.persons :
      this.state.persons.filter(p => this.parseFilterWord(p.name))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          rajaa näytettäviä:
          <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <h2>Lisää uusi</h2>
        <PersonForm
          add={this.addPerson}
          name={this.state.newName} nameChange={this.handleNameChange}
          number={this.state.newNumber} numberChange={this.handleNumberChange}
          />

        <h2>Numerot</h2>
        <PersonInfo persons={personsToShow} />
      </div>
    )
  }
}

export default App

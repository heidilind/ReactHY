import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: [0, 0, 0, 0, 0, 0]
    }
  }

  next = () => () => {
    const idx = Math.floor(Math.random() * this.props.anecdotes.length)
    this.setState({selected: idx})
  }

  vote = () => () => {
    const cpy = this.state.points
    cpy[this.state.selected] += 1
    this.setState({points: cpy})
  }

  arrayMaxIndex = () => {
    return this.state.points.indexOf(Math.max.apply(null, this.state.points))
  }

  render() {
    const best = () => {
      const notVotedYet = this.state.points.every(anecdoteVote => anecdoteVote === 0)
      if (notVotedYet) {
        return (
          <div>
            <em>Not voted yet</em>
          </div>
        )
      }
      const mostVoted = this.arrayMaxIndex()
      console.log(this.state.points)
      return (
       <div>
          {this.props.anecdotes[mostVoted]}
       </div>
      )
    }
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <div>
          <button onClick={this.vote()}>vote</button>
          <button onClick={this.next()}>next anecdote</button>
        </div>
        <h3>anecdote with most votes:</h3>
        <div>
          <div>{best()}</div>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

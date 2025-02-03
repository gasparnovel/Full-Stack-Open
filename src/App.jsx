import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const getMostVotedIndex = () => {
    return votes.indexOf(Math.max(...votes))
  }

  return (
    <div>
      <h1>Anécdota del día</h1>
      <div>{anecdotes[selected]}</div>
      <div>tiene {votes[selected]} votos</div>
      <button onClick={handleVote}>votar</button>
      <button onClick={handleNextAnecdote}>mostrar otra anécdota</button>

      <h1>Anécdota con más votos</h1>
      <div>{anecdotes[getMostVotedIndex()]}</div>
      <div>tiene {votes[getMostVotedIndex()]} votos</div>
    </div>
  )
}

export default App
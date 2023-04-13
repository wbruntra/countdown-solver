import React, { Fragment, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import solvePuzzle from './utils'
import NumberCircle from './NumberCircle'

const exampleArray = [3, 13, 19, 20, 23, 25]

function App() {
  const [numberInput, setNumberInput] = useState(exampleArray.join(', '))
  const [numbers, setNumbers] = useState(exampleArray)
  const [target, setTarget] = useState('456')

  const parseNumbers = (numbersString) => {
    try {
      return numbersString.split(',').map((n) => Number(n.trim()))
    } catch (e) {
      return []
    }
  }

  const [solution, setSolution] = useState(null)

  const handleSolve = (e) => {
    e.preventDefault()
    const result = solvePuzzle({
      target: Number(target),
      array: numberInput.split(',').map((n) => Number(n.trim())),
    })
    setSolution(result)
  }

  return (
    <div className="container py-4 px-5 dark-theme">
      <h1 className="text-center mb-4 text-white">Countdown/Digits Solver</h1>
      <div>
        <form onSubmit={handleSolve}>
          <div className="form-group">
            <label htmlFor="numbers" className="text-white">
              Numbers:
            </label>
            <input
              type="text"
              className="form-control w-50"
              id="numbers"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="target" className="text-white">
              Target:
            </label>
            <input
              type="text"
              className="form-control w-25"
              id="target"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Solve
          </button>
        </form>
      </div>
      <div className="row mt-5">
        <div className="col text-center">
          {parseNumbers(numberInput).map((number, index) => (
            <Fragment key={index}>
              <NumberCircle number={number} backgroundColor={'#fff'} textColor={'#333'} />
            </Fragment>
          ))}
          <NumberCircle number={target} backgroundColor={'#800020'} textColor={'#fff'} />
        </div>
      </div>
      <div className="row mt-5">
        {solution && (
          <div className="col-12 mt-5">
            {solution.solved ? (
              <div className="bg-secondary p-4 border rounded">
                <h2 className="mb-4 text-center text-white">Solution Steps</h2>
                <div className="row justify-content-center text-center">
                  <div className="col-4">
                    <ul className="fs-2 list-group">
                      {solution.history.map((history, index) => (
                        <li key={index} className="list-group-item text-black">
                          {history}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <h2>No Solution Found</h2>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

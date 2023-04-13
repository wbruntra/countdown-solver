import _ from 'lodash'

function sortNumbersAscending(arr) {
  return arr.sort((a, b) => a - b)
}

function removeElementsOnce(a, b) {
  const result = [...a]

  for (let i = 0; i < b.length; i++) {
    const index = result.indexOf(b[i])
    if (index !== -1) {
      result.splice(index, 1)
    }
  }

  return result
}

const operators = ['+', '-', '÷', '×']

const isSolved = (arr, target) => {
  return arr.includes(target)
}

// const combinations = require('combinations')
function combinations(combo, n = 2) {
  const { array: arr, history, target } = combo
  if (arr.length < n) return null
  const result = []

  // Recursive function to generate combinations
  function generateCombination(combination, start) {
    if (combination.length === n) {
      const combo = combination.slice()
      operators.forEach((op) => {
        let opResult = pairwiseOperator(combo[0], combo[1], op)
        const describeOp =
          combo[1] > combo[0] ? `${combo[0]}${op}${combo[1]}` : `${combo[1]}${op}${combo[0]}`
        if (isPositiveInteger(opResult)) {
          const newArray = sortNumbersAscending([opResult, ...removeElementsOnce(arr, combo)])
          const nextCombo = {
            target,
            array: newArray,
            history: [...history, describeOp],
            solved: false,
          }
          if (newArray.includes(target)) {
            result.push({ ...nextCombo, solved: true })
            return
          }
          result.push(nextCombo)
        }
      })
      return
    }

    for (let i = start; i < arr.length; i++) {
      combination.push(arr[i])
      generateCombination(combination, i + 1)
      combination.pop()
    }
  }

  generateCombination([], 0)
  return result
}

// Take integers a and b and an operator op (+, -, /, *), perform the given operation
function pairwiseOperator(a, b, op) {
  switch (op) {
    case '+':
      return a + b
    case '-':
      if (b > a) {
        return b - a
      }
      return a - b
    case '÷':
      if (b > a) {
        return b / a
      }
      return a / b
    case '×':
      return a * b
  }
}

function isPositiveInteger(num) {
  return Number.isInteger(num) && num > 0 && Math.sign(num) === 1
}

function solvePuzzle(puzzle) {
  const { array, target } = puzzle
  const cache = {}
  let solved = false
  let progress = [{ array, history: [], solved: false }]
  let depth = 0

  while (!solved && depth < 7) {
    const nextProgress = []

    for (const combo of progress) {
      const { array, history } = combo
      const cacheKey = array.join(',')
      if (cacheKey in cache) {
        continue
      }
      cache[cacheKey] = true

      for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
          for (const op of operators) {
            const opResult = pairwiseOperator(array[i], array[j], op)
            if (!isPositiveInteger(opResult)) {
              continue
            }
            const newArray = sortNumbersAscending([
              opResult,
              ...array.slice(0, i),
              ...array.slice(i + 1, j),
              ...array.slice(j + 1),
            ])
            let historyString =
              array[i] > array[j] ? `${array[i]} ${op} ${array[j]}` : `${array[j]} ${op} ${array[i]}`
            historyString = historyString + ` = ${opResult}`
            const newCombo = {
              array: newArray,
              history: [...history, historyString],
              solved: isSolved(newArray, target),
            }
            if (newCombo.solved) {
              // console.log('Solved!')
              // console.log(newCombo)
              return newCombo
            }
            nextProgress.push(newCombo)
          }
        }
      }
    }

    progress = nextProgress
    depth++
  }

  return {
    solved: false,
  }
}

export default solvePuzzle

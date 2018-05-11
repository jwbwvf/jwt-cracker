const jwt = require('jsonwebtoken')

const max = 126 // ~
const min = 33 // !

const incrementLast = (array, token) => {
  const guess = String.fromCharCode(...array)
  try {
    const verifiedToken = jwt.verify(token, guess)
    console.log(`secrete: ${guess}`)
    console.log(`token: ${JSON.stringify(verifiedToken)}`)
    process.exit()
  } catch (error) {
    console.log(`incorrect guess: ${guess}`)
  }

  if (array[array.length - 1] === max) { return }

  array[array.length - 1] += 1
  incrementLast(array, token)
}

const grow = (array) => {
  array.fill(min)
  array.unshift(min)
}

const findFirstNonMax = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] !== max) {
      return i
    }
  }

  return 0
}

const rollOver = (array) => {
  if (array.every((x) => { return x === max })) { return grow(array) }

  const index = findFirstNonMax(array)
  const tempValue = array[index]
  array[index] = tempValue + 1
  for (let i = index + 1; i < array.length; i++) { array[i] = min }
}

const main = () => {
  const token = jwt.sign({
    data: 'foobar'
  }, 'sa')
  const array = []
  array.push(min)
  for (let rounds = 0; rounds < 100; rounds++) {
    incrementLast(array, token)
    rollOver(array)
  }
}

main()

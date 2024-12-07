import { toCamelCase } from 'jsr:@std/text'
import { invert } from 'jsr:@std/collections'

console.log(toCamelCase('hello, world!')) // helloWorld

const challenge = { a: 'x', b: 'y', c: 'z' }

const result = { x: 'a', y: 'b', z: 'c' } //how to convert challenge to result with jsr:@std/collections?

const answer = invert(challenge)

console.table({
  ...answer,
  comparison: JSON.stringify(answer) === JSON.stringify(result),
})

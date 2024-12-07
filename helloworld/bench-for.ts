function sumUsingForEach(arr: number[]): number {
  let sum = 0
  arr.forEach((num) => {
    sum += num
  })
  return sum
}

function sumUsingReduce(arr: number[]): number {
  return arr.reduce((acc, num) => acc + num, 0)
}

function sumUsingForOf(arr: number[]): number {
  let sum = 0
  for (const num of arr) {
    sum += num
  }
  return sum
}

function sumUsingForLoop(arr: number[]): number {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

const largeArray = Array.from({ length: 10000000 }, (_, i) => i)

Deno.bench({
  name: 'Array forEach',
  fn: () => {
    sumUsingForEach(largeArray)
  },
})

Deno.bench({
  name: 'Array reduce',
  fn: () => {
    sumUsingReduce(largeArray)
  },
})

Deno.bench({
  name: 'Array for of',
  fn: () => {
    sumUsingForOf(largeArray) 
  },
})

Deno.bench({
  name: 'Array for loop',
  baseline: true,
  fn: () => {
    sumUsingForLoop(largeArray)
  },
})

/**
 * ➜  helloworld git:(main) ✗ deno bench bench.ts
Check file:///Users/USER/private/deno-study/helloworld/bench.ts
    CPU | Apple M3 Pro
Runtime | Deno 2.1.3 (aarch64-apple-darwin)

file:///Users/USER/private/deno-study/helloworld/bench.ts

benchmark        time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------- ----------------------------- --------------------- --------------------------
Array forEach             5.8 ms         171.0 (  5.2 ms …   7.2 ms)   6.1 ms   7.2 ms   7.2 ms
Array reduce              5.4 ms         186.7 (  5.1 ms …   6.1 ms)   5.4 ms   6.0 ms   6.1 ms
Array for of              4.9 ms         204.7 (  4.5 ms …   5.3 ms)   4.9 ms   5.0 ms   5.3 ms
Array for loop          907.5 µs         1,102 (635.1 µs …   1.4 ms)   1.3 ms   1.4 ms   1.4 ms

summary
  Array for loop
     5.38x faster than Array for of
     5.90x faster than Array reduce
     6.44x faster than Array forEach
 */

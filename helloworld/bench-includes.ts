function generateTestData(size: number) {
  const userIds = Array.from(
    { length: size },
    (_, i) => `user_${(i + 1000).toString(36)}`,
  )

  const productIds = Array.from(
    { length: size },
    () => `PROD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  )

  const emails = Array.from(
    { length: size },
    (_, i) => `user${i}@${['gmail', 'yahoo', 'hotmail', 'example'][i % 3]}.com`,
  )

  return [...userIds, ...productIds, ...emails]
}

function generateLookupValues(data: any, lookupSize: number, hitRatio = 0.7) {
  const lookupValues = []
  const hits = Math.floor(lookupSize * hitRatio)
  const misses = lookupSize - hits

  for (let i = 0; i < hits; i++) {
    const randomIndex = Math.floor(Math.random() * data.length)
    lookupValues.push(data[randomIndex])
  }

  for (let i = 0; i < misses; i++) {
    lookupValues.push(
      `nonexistent_${Math.random().toString(36).substring(2, 8)}`,
    )
  }

  return lookupValues.sort(() => Math.random() - 0.5)
}

const SIZE = 10000

const testData = generateTestData(SIZE)
const lookupValues = generateLookupValues(testData, SIZE)

Deno.bench({
  name: 'Array includes',
  baseline: true,
  fn: () => {
    for (const value of lookupValues) {
      // o(n)
      testData.includes(value)
    }
  },
})

Deno.bench({
  name: 'Set lookup',
  fn: () => {
    const dataSet = new Set(testData)
    for (const value of lookupValues) {
      // O(1)
      dataSet.has(value)
    }
  },
})

/**
 * ➜  helloworld git:(main) ✗ deno bench bench-includes.ts
Check file:///Users/USER/private/deno-study/helloworld/bench-includes.ts
    CPU | Apple M3 Pro
Runtime | Deno 2.1.3 (aarch64-apple-darwin)

file:///Users/USER/private/deno-study/helloworld/bench-includes.ts

benchmark        time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------- ----------------------------- --------------------- --------------------------
Array includes          514.1 ms           1.9 (512.4 ms … 518.2 ms) 515.1 ms 518.2 ms 518.2 ms
Set lookup              892.3 µs         1,121 (831.1 µs …   3.6 ms) 863.5 µs   1.3 ms   1.4 ms

summary
  Array includes
   576.10x slower than Set lookup

 */

function bubbleSort<T>(arr: T[]): T[] {
  const n = arr.length
  const sortedArr = [...arr]

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArr[j] > sortedArr[j + 1]) {
        ;[sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]]
        swapped = true
      }
    }
    if (!swapped) break
  }

  return sortedArr
}

function quickSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr

  const pivot = arr[arr.length - 1]
  const left = arr.filter((el, idx) => el <= pivot && idx !== arr.length - 1)
  const right = arr.filter((el) => el > pivot)

  return [...quickSort(left), pivot, ...quickSort(right)]
}

// Merge Sort
function mergeSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = []
  let i = 0, j = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }

  return result.concat(left.slice(i), right.slice(j))
}

function generateRandomString(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('')
}

const TEST_DATA = Array.from(
  { length: 10000 },
  () => generateRandomString(),
)

Deno.bench({
  name: 'Bubble Sort',
  fn: () => {
    bubbleSort(TEST_DATA)
  },
})

Deno.bench({
  name: 'Quick Sort',
  fn: () => {
    quickSort(TEST_DATA)
  },
})

Deno.bench({
  name: 'Merge Sort',
  fn: () => {
    mergeSort(TEST_DATA)
  },
})

Deno.bench({
  name: 'JS Sort',
  baseline: true,
  fn: () => {
    TEST_DATA.toSorted()
  },
})

/**
 * ➜  helloworld git:(main) ✗ deno bench bench-sorts-string.ts
Check file:///Users/USER/private/deno-study/helloworld/bench-sorts-string.ts
    CPU | Apple M3 Pro
Runtime | Deno 2.1.3 (aarch64-apple-darwin)

file:///Users/USER/private/deno-study/helloworld/bench-sorts-string.ts

benchmark     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------- ----------------------------- --------------------- --------------------------
Bubble Sort          465.3 ms           2.1 (460.9 ms … 478.0 ms) 465.6 ms 478.0 ms 478.0 ms
Quick Sort             2.7 ms         366.8 (  2.5 ms …   3.1 ms)   2.8 ms   3.1 ms   3.1 ms
Merge Sort             2.4 ms         409.6 (  2.3 ms …   3.0 ms)   2.5 ms   2.9 ms   2.9 ms
JS Sort                1.2 ms         838.0 (  1.1 ms …   1.5 ms)   1.2 ms   1.5 ms   1.5 ms

summary
  JS Sort
     2.05x faster than Merge Sort
     2.29x faster than Quick Sort
   389.90x faster than Bubble Sort
 */

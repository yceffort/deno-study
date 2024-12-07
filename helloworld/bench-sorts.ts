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

const TEST_DATA = Array.from(
  { length: 1000 },
  () => Math.floor(Math.random() * 1000),
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
 * ➜  helloworld git:(main) ✗ deno bench bench-sorts.ts
Check file:///Users/USER/private/deno-study/helloworld/bench-sorts.ts
    CPU | Apple M3 Pro
Runtime | Deno 2.1.3 (aarch64-apple-darwin)

file:///Users/USER/private/deno-study/helloworld/bench-sorts.ts

benchmark     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------- ----------------------------- --------------------- --------------------------
Bubble Sort            1.5 ms         685.4 (  1.3 ms …   3.1 ms)   1.5 ms   1.8 ms   1.8 ms
Quick Sort            66.2 µs        15,110 ( 59.8 µs … 361.0 µs)  65.6 µs 127.8 µs 132.7 µs
Merge Sort           141.2 µs         7,082 (125.8 µs … 323.3 µs) 139.7 µs 207.4 µs 213.6 µs
JS Sort               79.6 µs        12,560 ( 75.3 µs … 211.9 µs)  83.0 µs  94.0 µs  96.9 µs

summary
  JS Sort
     1.20x slower than Quick Sort
     1.77x faster than Merge Sort
    18.33x faster than Bubble Sort
 */

import { multiply } from './lib.ts'
import {
  assertEquals,
  assertExists,
  assertGreater,
  assertMatch,
  assertNotMatch,
} from '@std/assert'
import { expect } from 'jsr:@std/expect'

Deno.test(function multiplyTest() {
  assertEquals(multiply(2, 2), 4)
  assertEquals(multiply(2, 3), 6)
})

/*
➜  helloworld git:(main) ✗ deno test lib.test.ts
running 1 test from ./lib.test.ts
multiplyTest ... FAILED (1ms)

 ERRORS

multiplyTest => ./lib.test.ts:4:6
error: AssertionError: Values are not equal.


    [Diff] Actual / Expected


-   81
+   12

  throw new AssertionError(message);
        ^
    at assertEquals (https://jsr.io/@std/assert/1.0.9/equals.ts:64:9)
    at multiplyTest (file:///Users/USER/private/deno-study/helloworld/lib.test.ts:5:3)

 FAILURES

multiplyTest => ./lib.test.ts:4:6

FAILED | 0 passed | 1 failed (1ms)

error: Test failed
*/

Deno.test('multiply test', () => {
  expect(multiply(2, 3)).toBe(6)
})

/**
 * ➜  helloworld git:(main) ✗ deno test lib.test.ts
Check file:///Users/USER/private/deno-study/helloworld/lib.test.ts
running 2 tests from ./lib.test.ts
multiplyTest ... ok (0ms)
multiply test ... ok (0ms)

ok | 2 passed | 0 failed (1ms)
 */

Deno.test('mock Api Call', async () => {
  const mockApi = () => Promise.resolve('mock data')
  const result = await mockApi()
  assertEquals(result, 'mock data')
})

// Multi-step Test
Deno.test('database lib', async (t) => {
  // Setup Logic
  const db = new Map()

  await t.step('db exists', () => {
    assertExists(db)
  })

  await t.step('insert user', () => {
    db.set('user', 'jeff')

    assertGreater(db.size, 0)
    assertMatch(db.get('user'), /jeff/)
    assertNotMatch(db.get('user'), /Bob/)
  })
})

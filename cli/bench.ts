import { toUpperCaseWithC } from "../example/ffi.ts";

let longString = "abcdefghij".repeat(1000);

Deno.bench({
  name: "JS uppercase",
  baseline: true,
  fn: () => {
    longString.toUpperCase();
  },
});

Deno.bench({
  name: "C uppercase",
  fn: () => {
    toUpperCaseWithC(longString);
  },
});

// deno bench --allow-ffi bench.ts
/*
Check file:///Users/USER/private/deno-study/cli/example/bench.ts
    CPU | Apple M3 Pro
Runtime | Deno 2.1.3 (aarch64-apple-darwin)

file:///Users/USER/private/deno-study/cli/example/bench.ts

benchmark      time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------- ----------------------------- --------------------- --------------------------
JS uppercase            3.8 ns   262,300,000 (  2.8 ns …   7.7 ns)   4.1 ns   5.1 ns   5.1 ns
C uppercase            18.8 µs        53,100 ( 16.9 µs … 205.0 µs)  18.6 µs  24.2 µs  31.7 µs

summary
  JS uppercase
     4939x faster than C uppercase
*/

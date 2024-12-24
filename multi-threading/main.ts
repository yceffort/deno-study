const numbers = Array.from({ length: 5 }).map(() => 50);

numbers.forEach((number) => {
  const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
    type: "module",
  });

  worker.postMessage({ n: number });

  worker.onmessage = (e) => {
    console.log(`Fibonacci of ${number} is ${e.data}`);
    worker.terminate();
  };
});

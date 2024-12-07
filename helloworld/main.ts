export function helloWorld() {
  console.log('is this main?', import.meta.main)
  return 'Hello, World!'
}

// This is the entry point of the program.
// It will only run when the script is executed directly.
// like python's if __name__ == "__main__": block
// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(helloWorld())
}

const __dirname = new URL('.', import.meta.url).pathname
console.table({ __dirname })

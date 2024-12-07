// deno run --env -A env.ts
const production = Deno.env.get('hello')

console.log(production)

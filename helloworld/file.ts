const raw = await Deno.readFile('./diary.txt')
const diary = new TextDecoder().decode(raw)

console.log(diary)

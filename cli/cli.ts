// example git:(main) ✗ deno run cli.ts --text "hey" --foo
// ["--text", "hey", "--foo"];
// console.log(Deno.args);
import { toKebabCase, toSnakeCase } from "jsr:@std/text";
import { parseArgs } from "jsr:@std/cli/parse-args";
import {
  bgGreen,
  bgWhite,
  blue,
  magenta,
  red,
  yellow,
} from "jsr:@std/fmt/colors";
import { toUpperCaseWithC } from "./ffi.ts";

const flags = parseArgs(Deno.args, {
  boolean: ["snake", "kebab"],
  string: ["text"],
  default: { "text": "Hi Mom" },
});

const age = prompt("how old are you?");

if (parseInt(age!) < 21) {
  console.log(red("You are not old enough to run this command"));
  Deno.exit();
}

console.log();
console.log(bgGreen("ACCESS GRANTED!"));
console.log();

const shouldProceed = confirm("Are you sure?");

if (!shouldProceed) {
  console.log(red(bgWhite("terminated")));
  Deno.exit();
}

console.log();

const upper = toUpperCaseWithC(flags.text);
console.log(yellow(upper));
flags.kebab && console.log(blue(toKebabCase(flags.text)));
flags.snake && console.log(magenta(toSnakeCase(flags.text)));

// deno compile --allow-ffi -o upper cli.ts
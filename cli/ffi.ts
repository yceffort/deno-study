const libName = "lib.dll";

// dynamic library open
const lib = Deno.dlopen(libName, {
  toUpperCase: {
    parameters: ["pointer"],
    result: "void",
  },
});

function toCString(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str + "\0");
}

export function toUpperCaseWithC(str: string): string {
  const text = toCString(str);
  const ptr = Deno.UnsafePointer.of(text);
  lib.symbols.toUpperCase(ptr);
  return new TextDecoder().decode(text);
}

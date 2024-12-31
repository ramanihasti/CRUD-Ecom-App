for (let i = 0; i < 5; i++) {
  console.log(i + 1);
}
console.log("Upper left triangle");
let n = 5;
for (let i = 1; i <= n; i++) {
  const str = "* ";
  console.log(str.repeat(i));
}
console.log("Upper Right triangle");
let a = 5;
for (let i = 1; i <= a; i++) {
  const str = "* ";
  const space = "  ";
  console.log(space.repeat(a - i) + str.repeat(i));
}
console.log("Lower Left Triangle");
let x = 5;
for (let i = x; i >= 1; i--) {
  const str = "* ";
  console.log(str.repeat(i));
}

console.log("Lower Right Pattern");
let y = 5;
for (let i = y; i >= 1; i--) {
  const str = "* ";
  const space = "  ";
  console.log(space.repeat(y - i) + str.repeat(i));
}
console.log("Inverted Pyramid Pattern ");
let z = 7;
for (let i = z; i >= 1; i--) {
  const str = "* ";
  const space = " ";
  console.log(space.repeat(z - i) + str.repeat(i));
}
console.log("Pyramid Pattern");
let q = 7;
for (let i = 1; i <= q; i++) {
  const str = "* ";
  const space = " ";
  console.log(space.repeat(q - i) + str.repeat(i));
}

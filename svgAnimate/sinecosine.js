/**
 * @file logs sine and cosine on nodejs (for point rotation)
 */
console.log("cy value");
for (let i = 0; i < Math.PI * 2; i += Math.PI / 30) {
  if (i != 0) {
    process.stdout.write(";");
  }
  process.stdout.write(`${-Math.sin(i) * 100}`);
}
process.stdout.write("\n");
console.log("cx value");
for (let i = 0; i < Math.PI * 2; i += Math.PI / 30) {
  if (i != 0) {
    process.stdout.write(";");
  }
  process.stdout.write(`${Math.cos(i) * 100}`);
}
process.stdout.write("\n");

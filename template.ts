import * as fs from "fs";

// input
const inputs = fs.readFileSync(process.stdin.fd, "utf8");

// output
console.log(inputs);

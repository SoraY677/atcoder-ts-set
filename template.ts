/**
 * Problem ID: ${problemId}
 */
import * as fs from "fs";

const input = () => {
  const stdin = fs.readFileSync(process.stdin.fd, "utf8");
  return stdin.split("\n").map((v) => v.split(" "));
};
const output = (stdout: any) => {
  console.log(stdout);
};

const main = () => {
  const arr = input();

  // write code

  output(arr);
};

main();

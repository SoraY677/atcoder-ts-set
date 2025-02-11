import fs from "fs";
import readline from "readline";
import { exec } from "child_process";
import { PROBLEMS_DIR, STDIN_TMP_FILE } from "../config.js";

/**
 * メイン実行
 */
const main = async () => {
  const args = process.argv.slice(2);
  const problemId = args.at(0);
  if (args.length !== 1 || problemId === undefined)
    throw "script need only 1 arg: Problem ID";

  const input = await stdin();
  fs.writeFileSync(STDIN_TMP_FILE, input);

  // サブプロセスで実行
  exec(
    `npx tsx ${PROBLEMS_DIR}/${problemId}.ts < ${STDIN_TMP_FILE}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`error: ${stderr}`);
        return;
      }
      console.log(stdout);
    }
  );
};

/**
 * ファイル入力受付(無入力改行で終了)
 * @returns 入力結果
 */
const stdin = async (): Promise<string> => {
  return new Promise((resolve) => {
    let lines: string[] = [];
    const reader = readline.createInterface({
      input: process.stdin,
    });
    reader.on("line", (line) => {
      // 改行のみだったときに標準入力を終了したと判断
      if (line == "") {
        reader.close();
      }
      lines.push(line);
    });
    reader.on("close", () => {
      resolve(lines.join("\n"));
    });
  });
};

main();

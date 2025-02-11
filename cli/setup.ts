import fs from "fs";
import {
  PROBLEM_ID_VARIABLE,
  PROBLEMS_DIR,
  TEMPLATE_SCRIPT_FILE,
} from "../config.js";

/**
 * メイン実行
 */
const main = () => {
  const args = process.argv.slice(2);
  const problemId = args.at(0);
  if (args.length !== 1 || problemId === undefined)
    throw "script need only 1 arg";

  createProblemFile(problemId);
};

/**
 * ファイルを生成
 * @param problemId
 */
const createProblemFile = (problemId: string) => {
  const fileName = `${problemId}.ts`;

  const outputFilePath = `${PROBLEMS_DIR}/${fileName}`;
  if (fs.existsSync(outputFilePath)) throw "file already exist!";

  const templateFileBody = `${fs.readFileSync(
    TEMPLATE_SCRIPT_FILE
  )}`.replaceAll(PROBLEM_ID_VARIABLE, problemId);

  fs.writeFileSync(outputFilePath, templateFileBody);
  console.log(`generate problem file: ${outputFilePath}`);
};

main();

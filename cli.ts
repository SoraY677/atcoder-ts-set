import fs from "fs-extra";
import path from "path";

const TEMPLATE_FILE = "./template.ts";
const PROBLEMS_DIR = "./problems";

const args = process.argv.slice(2);
switch (args[0]) {
  case "setup":
    setup();
    break;
}

function setup() {
  const problems = ["a", "b", "c", "d", "e", "f"];
  if (!fs.existsSync(PROBLEMS_DIR)) {
    fs.mkdirSync(PROBLEMS_DIR, { recursive: true });
  } else {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}-${now
      .getHours()
      .toString()
      .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    fs.copySync(PROBLEMS_DIR, PROBLEMS_DIR + "-" + formattedDate);
  }
  for (const problem of problems) {
    fs.copyFileSync(TEMPLATE_FILE, path.join(PROBLEMS_DIR, `${problem}.ts`));
  }
}

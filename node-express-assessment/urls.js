const fs = require("fs");
const process = require("process");
const axios = require("axios");

async function fetchData(url) {
  try {
    const { data } = await axios.get(url);

    return data;
  } catch (err) {
    console.log(err);
  }
}

function saveFile(fileName, content) {
  const file = `./files/${fileName
    .replace(/(^\w+:|^)\/\//, "")
    .split("/")
    .pop()}`;

  console.log(file);

  try {
    fs.writeFileSync(file, content);
    console.log(`File ${file} successfully saved!`);
  } catch (error) {
    console.error(`File write failed: ${error}`);
    process.exit(1);
  }
}

function cat(path) {
  fs.readFile(path, "utf8", async (err, data) => {
    if (err) {
      console.log("Error:", err);
      process.exit(1);
    }

    const array = data.split("\n");

    console.log(array);

    for (let item of array) {
      saveFile(item, await fetchData(item));
    }
  });
}

cat(process.argv[2]);

const fs = require("fs");
const process = require("process");
const axios = require("axios");

async function fetchData(url) {
  try {
    const { status } = await axios.get(url);

    return status;
  } catch (err) {
    // console.log(err);
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
      console.log(
        "HHHEEEEERRRRRRREEEEEEEEEEEEEE//////////////////////////",
        await fetchData(item)
      );
    }
  });
}

cat(process.argv[2]);

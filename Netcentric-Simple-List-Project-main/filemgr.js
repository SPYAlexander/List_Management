// Done by Nov 2023
const fs = require("fs/promises")

async function ReadData() {
  try {
    // Make sure the file exists
    await fs.access("./listdata.json", fs.constants.R_OK, fs.constants.W_OK);
    // Read the file
    const jData = await fs.readFile("./listdata.json", "utf8");
    // convert the buffer to a json object and return it
    return JSON.parse(jData);

  } catch (error) {
    return [];
  }
}

async function WriteData(dataOut) {
  try {
    // Write the file
    await fs.writeFile("./listdata.json", JSON.stringify(dataOut), "utf-8");
    return;
  } catch (error) {
    return;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
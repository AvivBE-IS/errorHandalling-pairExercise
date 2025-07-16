// app.js
const { handleCommand } = require("./commands/commandHandler");

const args = process.argv.slice(2);
handleCommand(args);

const { addContact, listContacts, searchContacts, deleteContact } = require("../services/contactService");
const { validateAddArgs } = require("../utils/validation");

function printHelp() {
  console.log(`Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"  - Add a new contact
  list                        - List all contacts
  search "query"              - Search contacts by name or email
  delete "email"              - Delete contact by email
  help                        - Show this help message

Examples:
  node contacts.js add "John Doe" "john@example.com" "555-123-4567"
  node contacts.js search "john"
  node contacts.js delete "john@example.com"
`);
}

function handleCommand(args) {
  const [command, ...rest] = args;

  try {
    switch (command) {
      case "add":
        validateAddArgs(rest);
        addContact(...rest);
        break;
      case "list":
        listContacts();
        break;
      case "search":
        if (rest.length < 1) throw new Error("Missing search query");
        searchContacts(rest[0]);
        break;
      case "delete":
        if (rest.length < 1) throw new Error("Missing email for delete");
        deleteContact(rest[0]);
        break;
      case "help":
        printHelp();
        break;
      default:
        console.log(`✗ Error: Unknown command '${command}'`);
        console.log("Usage: node contacts.js [add|list|search|delete|help] [arguments]");
    }
  } catch (err) {
    console.log(`✗ Error: ${err.message}`);
  }
}

module.exports = {
  handleCommand,
};

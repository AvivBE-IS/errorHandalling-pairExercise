const fs = require("fs");
const path = "contacts.json";

function loadContacts() {
  try {
    if (!fs.existsSync(path)) {
      console.log("✗ File not found - creating new contact list");
      return [];
    }
    const data = fs.readFileSync(path);
    return JSON.parse(data);
  } catch (err) {
    console.log("✗ Error reading contacts file");
    return [];
  }
}

function saveContacts(contacts) {
  try {
    fs.writeFileSync(path, JSON.stringify(contacts, null, 2));
    console.log("✓ Contacts saved to contacts.json");
  } catch (err) {
    console.log("✗ Error saving contacts");
  }
}

module.exports = {
  loadContacts,
  saveContacts,
};

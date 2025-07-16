const { loadContacts, saveContacts } = require("../utils/fileUtils");
const { validateEmail, validatePhone } = require("../utils/validation");

function addContact(name, email, phone) {
  const contacts = loadContacts();
  console.log(`✓ Loaded ${contacts.length} contacts`);

  if (contacts.find(c => c.email === email)) {
    throw new Error("Contact with this email already exists");
  }

  validateEmail(email);
  validatePhone(phone);

  const newContact = { name, email, phone };
  contacts.push(newContact);

  console.log(`✓ Contact added: ${name}`);
  saveContacts(contacts);
}

function listContacts() {
  const contacts = loadContacts();
  console.log(`✓ Loaded ${contacts.length} contacts`);
  console.log("\n=== All Contacts ===");
  contacts.forEach((c, i) =>
    console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`)
  );
}

function searchContacts(query) {
  const contacts = loadContacts();
  console.log(`✓ Loaded ${contacts.length} contacts`);
  const results = contacts.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  );
  console.log(`\n=== Search Results for \"${query}\" ===`);
  if (results.length === 0) {
    console.log(`No contacts found matching \"${query}\"`);
  } else {
    results.forEach((c, i) =>
      console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`)
    );
  }
}

function deleteContact(email) {
  const contacts = loadContacts();
  console.log(`✓ Loaded ${contacts.length} contacts`);
  const index = contacts.findIndex(c => c.email === email);
  if (index === -1) {
    throw new Error(`No contact found with email: ${email}`);
  }
  const deleted = contacts.splice(index, 1)[0];
  console.log(`✓ Contact deleted: ${deleted.name}`);
  saveContacts(contacts);
}

module.exports = {
  addContact,
  listContacts,
  searchContacts,
  deleteContact,
};

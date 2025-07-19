const {
  addContact,
  listContacts,
  searchContacts,
  deleteContact,
} = require("../services/contactService");

jest.mock("../utils/fileUtils", () => ({
  loadContacts: jest.fn(),
  saveContacts: jest.fn(),
}));

jest.mock("../utils/validation", () => ({
  validateEmail: jest.fn(),
  validatePhone: jest.fn(),
}));

const { loadContacts, saveContacts } = require("../utils/fileUtils");
const { validateEmail, validatePhone } = require("../utils/validation");

describe("contactService", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("addContact adds a new contact successfully", () => {
    loadContacts.mockReturnValue([]);
    addContact("John", "john@example.com", "123456");

    expect(validateEmail).toHaveBeenCalledWith("john@example.com");
    expect(validatePhone).toHaveBeenCalledWith("123456");
    expect(saveContacts).toHaveBeenCalledWith([
      { name: "John", email: "john@example.com", phone: "123456" },
    ]);
    expect(consoleLogSpy).toHaveBeenCalledWith("✓ Contact added: John");
  });

  test("addContact throws if contact with same email exists", () => {
    loadContacts.mockReturnValue([
      { name: "Existing", email: "john@example.com", phone: "000" },
    ]);

    expect(() => addContact("John", "john@example.com", "123456")).toThrow(
      "Contact with this email already exists"
    );
  });

  test("listContacts prints all contacts", () => {
    loadContacts.mockReturnValue([
      { name: "John", email: "john@example.com", phone: "123" },
      { name: "Jane", email: "jane@example.com", phone: "456" },
    ]);

    listContacts();

    expect(consoleLogSpy).toHaveBeenCalledWith("✓ Loaded 2 contacts");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("1. John - john@example.com - 123")
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("2. Jane - jane@example.com - 456")
    );
  });

  test("searchContacts finds matching contact by name", () => {
    loadContacts.mockReturnValue([
      { name: "John", email: "john@example.com", phone: "123" },
    ]);

    searchContacts("john");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("1. John - john@example.com - 123")
    );
  });

  test("searchContacts prints 'not found' if no matches", () => {
    loadContacts.mockReturnValue([
      { name: "Alice", email: "alice@example.com", phone: "000" },
    ]);

    searchContacts("bob");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("No contacts found matching")
    );
  });

  test("deleteContact deletes existing contact", () => {
    loadContacts.mockReturnValue([
      { name: "John", email: "john@example.com", phone: "123" },
      { name: "Jane", email: "jane@example.com", phone: "456" },
    ]);

    deleteContact("john@example.com");

    expect(consoleLogSpy).toHaveBeenCalledWith("✓ Contact deleted: John");
    expect(saveContacts).toHaveBeenCalledWith([
      { name: "Jane", email: "jane@example.com", phone: "456" },
    ]);
  });

  test("deleteContact throws if email not found", () => {
    loadContacts.mockReturnValue([
      { name: "Alice", email: "alice@example.com", phone: "000" },
    ]);

    expect(() => deleteContact("notfound@example.com")).toThrow(
      "No contact found with email: notfound@example.com"
    );
  });
});

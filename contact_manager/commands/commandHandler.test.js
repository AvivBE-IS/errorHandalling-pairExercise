const { handleCommand } = require("../contacts");

jest.mock("../services/contactService", () => ({
  addContact: jest.fn(),
  listContacts: jest.fn(),
  searchContacts: jest.fn(),
  deleteContact: jest.fn(),
}));

jest.mock("../utils/validation", () => ({
  validateAddArgs: jest.fn(),
}));

const {
  addContact,
  listContacts,
  searchContacts,
  deleteContact,
} = require("../services/contactService");

const { validateAddArgs } = require("../utils/validation");

describe("handleCommand", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("calls addContact with correct args", () => {
    handleCommand(["add", "John", "john@example.com", "123456"]);
    expect(validateAddArgs).toHaveBeenCalledWith([
      "John",
      "john@example.com",
      "123456",
    ]);
    expect(addContact).toHaveBeenCalledWith(
      "John",
      "john@example.com",
      "123456"
    );
  });

  test("calls listContacts", () => {
    handleCommand(["list"]);
    expect(listContacts).toHaveBeenCalled();
  });

  test("calls searchContacts with query", () => {
    handleCommand(["search", "john"]);
    expect(searchContacts).toHaveBeenCalledWith("john");
  });

  test("calls deleteContact with email", () => {
    handleCommand(["delete", "john@example.com"]);
    expect(deleteContact).toHaveBeenCalledWith("john@example.com");
  });

  test("prints help for 'help' command", () => {
    handleCommand(["help"]);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Usage: node contacts.js")
    );
  });

  test("prints error for unknown command", () => {
    handleCommand(["unknown"]);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("✗ Error: Unknown command")
    );
  });

  test("prints error if search has no argument", () => {
    handleCommand(["search"]);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("✗ Error: Missing search query")
    );
  });

  test("prints error if delete has no argument", () => {
    handleCommand(["delete"]);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("✗ Error: Missing email for delete")
    );
  });

  test("catches and prints error from validateAddArgs", () => {
    validateAddArgs.mockImplementation(() => {
      throw new Error("Invalid arguments");
    });
    handleCommand(["add", "John"]);
    expect(consoleLogSpy).toHaveBeenCalledWith("✗ Error: Invalid arguments");
  });
});

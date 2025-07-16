function validateEmail(email) {
  if (!email.includes('@')) {
    throw new Error("Email must contain @ symbol");
  }
}

function validatePhone(phone) {
  const regex = /^\\d{3}-\\d{3}-\\d{4}$/;
  if (!regex.test(phone)) {
    throw new Error("Phone must be in the format 555-123-4567");
  }
}

function validateAddArgs(args) {
  if (args.length < 3) {
    throw new Error("Missing arguments for add command");
  }
}

module.exports = {
  validateEmail,
  validatePhone,
  validateAddArgs,
};

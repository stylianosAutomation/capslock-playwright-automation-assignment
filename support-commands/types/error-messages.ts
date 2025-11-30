import { testData } from "../utils/test-data";

// Extract invalid email value for use in error messages
const emailValue = testData.invalid.emailWrong;

export const FieldErrorMessages =  {
  zip: {
    invalid: "Wrong ZIP code.",
    required: "Enter your ZIP code.",
  },
  variants: {
    required: "Choose one of the variants."
  },
  email: {
    invalid: `Please include an '@' in the email address. '${emailValue}' is missing an '@'.`,
    required: 'Please fill out this field.',
  },
  name: {
    invalid: "Your name should consist only of latin letters, apostrophes, underscores, dots and dashes.",
    empty: "Please enter your name.",
    onlyFirstName: "Your full name should contain both first and last name.",
  },
  phone: {
    invalid: "Wrong phone number.",
    required: "Enter your phone number.",
  },
} as const;

//  simple per-field types
export type ZipErrorKey = keyof typeof FieldErrorMessages.zip;        // "invalid" | "required"
export type VariantsErrorKey = keyof typeof FieldErrorMessages.variants; // "required"
export type EmailErrorKey = keyof typeof FieldErrorMessages.email;
export type NameErrorKey = keyof typeof FieldErrorMessages.name;
export type PhoneErrorKey = keyof typeof FieldErrorMessages.phone;

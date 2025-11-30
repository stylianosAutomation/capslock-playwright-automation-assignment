// Import faker library for generating random test data

import { faker } from '@faker-js/faker';


const first = String(faker.datatype.number({ min: 2, max: 9 }));
const rest = faker.random.numeric(9);     // 9 more digits
const rawPhone = first + rest;            // 10 digits total, e.g. "6793153134"

export const testData = {
  valid: {
    
    zipCode: faker.address.zipCode("#####"),
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    phone: rawPhone, 
  },
  invalid: {
    fullNameDigits: "Stylianos343",
    zipShort: "1e34",
    emailWrong: "wrong-email",
    phoneShort: "4234",
    onlyFirstName: "Stylianos",
  }
};


export function formatMaskedPhone(raw: string): string {
  return `(${raw.slice(0, 3)})${raw.slice(3, 6)}-${raw.slice(6)}`;
}

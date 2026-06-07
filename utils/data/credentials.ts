export function generateWrongEmailFormat() {
    return `test-email+${Date.now()}`;
}

export function generateRandomEmail() {
    return `test-email+${Date.now()}@yopmail.com`;
}

export function generateRandomPassword() {
    // Date.now() returns a number, so we first convert it to a string
    const timeStamp = Date.now().toString();

    // Take the first 10 digits and add them to "Pass@" (5 characters) -> Total 15
    return `Pass@${timeStamp.slice(0, 9)}`;
}

export function getRandomValueFromArray(array: any) {
    // Math.random() generates a number from 0 to 1
    // Multiply by the length of the array and round down using Math.floor
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}

export const testUser1 = {
    name: 'Name',
    lastName: 'Surname',
    email: process.env.USER_EMAIL || '',
    password: process.env.USER_PASSWORD || '',
};

export const errorMessageColor = {
    incorrect: 'rgb(220, 53, 69)',
    wrongCredentials: 'rgb(114, 28, 36)',
};

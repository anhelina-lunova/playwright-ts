export const testUser1 = {
    name: 'Name',
    lastName: 'Surname',
    email: process.env.USER_EMAIL || '',
    password: process.env.USER_PASSWORD || '',
};

export const testUser2 = {
    name: 'Name',
    lastName: 'Surname',
    email: process.env.USER_EMAIL_2 || '',
    password: process.env.USER_PASSWORD_2 || '',
};

export const errorMessageColor = {
    incorrect: 'rgb(220, 53, 69)',
    wrongCredentials: 'rgb(114, 28, 36)',
};

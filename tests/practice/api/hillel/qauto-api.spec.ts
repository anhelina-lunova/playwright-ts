import { test, expect } from '@playwright/test';
import { testUser1 } from '../../../../test-data/testUsers';

test.describe('Unauthenticated', async () => {
    test('Get all brands', async ({ request }) => {
        const response = await request.get('/api/cars/brands');
        const responseJson = await response.json();
        const brands = responseJson.data;
        const firstBrand = brands[0];
        expect(response.status()).toBe(200);
        expect(brands).toHaveLength(5);
        expect(firstBrand.title).toBe('Audi');
        // console.log(await response.json());
    });

    test('Get all models', async ({ request }) => {
        const response = await request.get('/api/cars/models');
        const responseJson = await response.json();
        const models = responseJson.data;
        const firstModel = models[0];

        // console.log(models);

        expect(response.status()).toBe(200);
        expect(models).toHaveLength(23);
        expect(firstModel.title).toBe('TT');
    });

    test('Should return 401 on Add a car attempt as unauthenticated user', async ({
        request,
    }) => {
        const newCarData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 122,
        };

        const response = await request.post('/api/cars', {
            data: newCarData,
        });
        expect(response.status()).toBe(401);
    });

    test('Sign in', async ({ request }) => {
        const existingUserData = {
            email: testUser1.email,
            password: testUser1.password,
            remember: false,
        };
        const response = await request.post('/api/auth/signin', {
            data: existingUserData,
        });
        expect(response.status()).toBe(200);

        const sid = response.headers()['set-cookie'].split(';')[0];
        expect(sid).toContain('sid=');
    });
});

test.describe('Authenticated', async () => {
    test('Add a car', async ({ request }) => {
        const newCarData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 122,
        };

        const response = await request.post('/api/cars', {
            data: newCarData,
        });
        expect(response.status()).toBe(401);
    });
});

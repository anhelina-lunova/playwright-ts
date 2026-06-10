import { test, expect } from '@playwright/test';
import { testUser1 } from '../../../../test-data/testUsers';
test.describe('Private requests', () => {
    let sid: string;

    test.beforeAll('Sign in as User1', async ({ request }) => {
        const existingUserData = {
            email: testUser1.email,
            password: testUser1.password,
            remember: false,
        };
        const responseAuth = await request.post('/api/auth/signin', {
            data: existingUserData,
        });
        expect(responseAuth.status()).toBe(200);

        sid = responseAuth.headers()['set-cookie'].split(';')[0];
        expect(sid).toContain('sid=');
    });

    test.describe('Add a car', () => {
        let addedCarsToRemove: number[] = [];

        test('Add new car - Ford Fiesta', async ({ request }) => {
            const newCarData = {
                carBrandId: 3,
                carModelId: 11,
                mileage: 123,
            };

            const response = await request.post('/api/cars', {
                data: newCarData,
                headers: {
                    cookie: sid,
                },
            });

            expect(response.status()).toBe(201);

            const responseJson = await response.json();
            const addedCar = responseJson.data;

            expect(addedCar.id).toBeDefined();

            expect(addedCar.carBrandId).toBe(newCarData.carBrandId);
            expect(addedCar.carModelId).toBe(newCarData.carModelId);
            expect(addedCar.initialMileage).toBe(newCarData.mileage);

            expect(addedCar.brand).toBe('Ford');
            expect(addedCar.model).toBe('Fiesta');
            expect(addedCar.mileage).toBe(newCarData.mileage);

            addedCarsToRemove.push(addedCar.id);
        });

        test('Add new car - Audi TT', async ({ request }) => {
            const newCarData = {
                carBrandId: 1,
                carModelId: 1,
                mileage: 124,
            };

            const response = await request.post('/api/cars', {
                data: newCarData,
                headers: {
                    cookie: sid,
                },
            });
            expect(response.status()).toBe(201);

            const responseJson = await response.json();
            const addedCar = responseJson.data;

            expect(addedCar.id).toBeDefined();

            expect(addedCar.carBrandId).toBe(newCarData.carBrandId);
            expect(addedCar.carModelId).toBe(newCarData.carModelId);
            expect(addedCar.initialMileage).toBe(newCarData.mileage);

            expect(addedCar.brand).toBe('Audi');
            expect(addedCar.model).toBe('TT');
            expect(addedCar.mileage).toBe(newCarData.mileage);

            addedCarsToRemove.push(addedCar.id);
        });

        test.afterAll('Remove added cars', async ({ request }) => {
            for (const id of addedCarsToRemove) {
                const response = await request.delete(`/api/cars/${id}`, {
                    headers: { cookie: sid },
                });

                expect(response.status()).toBe(200);

                const responseJson = await response.json();
                const carId = responseJson.data.carId;

                expect(carId).toBe(id);
            }
        });
    });

    test.describe('Remove a car', () => {
        let removeBlockIds: number[] = [];

        test.beforeAll(
            'Get fresh cars list for deletion',
            async ({ request }) => {
                const response = await request.get('/api/cars', {
                    headers: { cookie: sid },
                });
                expect(response.status()).toBe(200);

                const responseJson = await response.json();
                removeBlockIds = responseJson.data.map((car: any) => car.id);
            },
        );

        test('Delete a car', async ({ request }) => {
            if (removeBlockIds.length === 0) {
                console.log('User has no cars to delete');
                test.skip(
                    true,
                    'Skipping test because there are no cars to delete.',
                );
            }

            const carToRemoveId = removeBlockIds[0];
            const response = await request.delete(
                `/api/cars/${carToRemoveId}`,
                {
                    headers: { cookie: sid },
                },
            );

            expect(response.status()).toBe(200);

            const responseJson = await response.json();
            const carId = responseJson.data.carId;

            expect(carId).toBe(carToRemoveId);
        });

        test('Delete a car with invalid ID', async ({ request }) => {
            const response = await request.delete(`/api/cars/527223527223`, {
                headers: { cookie: sid },
            });
            expect(response.status()).toBe(404);

            const responseJson = await response.json();

            expect(responseJson.message).toBe('Car not found');
        });
    });
});

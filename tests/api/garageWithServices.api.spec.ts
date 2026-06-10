import { test, expect } from '@playwright/test';
import { testUser1 } from '../../test-data/testUsers';
import GarageService from '../../utils/api/services/GarageService';
import AuthService from '../../utils/api/services/AuthService';

let garageService: GarageService;
let authService: AuthService;

test.beforeEach('Initialize', ({ request }) => {
    garageService = new GarageService(request);
    authService = new AuthService(request);
});

test.describe('Public requests', () => {
    test('Get all brands', async () => {
        const brands = await garageService.getAllBrands();
        expect(brands).toHaveLength(5);
    });

    test('Get all models', async () => {
        const models = await garageService.getAllModels();
        expect(models).toHaveLength(23);
    });

    test('Get model by id', async () => {
        const model = await garageService.getModel(2);
        expect(model.carBrandId).toBe(1);
        expect(model.title).toBe('R8');
    });

    test('Get model by invalid id', async () => {
        const response = await garageService.getModel(77, false);
        expect(response.status()).toBe(404);
        const responseJson = await response.json();
        expect(responseJson.message).toBe('No car models found with this id');
    });
});

test.describe('Private requests', () => {
    let sid: string;

    test.beforeAll('Sign in as User1', async ({ request }) => {
        authService = new AuthService(request);
        sid = await authService.getAuthCookie(
            testUser1.email,
            testUser1.password,
        );
    });

    test.describe('Add a car', () => {
        let addedCarsToRemove: number[] = [];

        test('Add new car - Ford Fiesta', async () => {
            const newCarData = {
                carBrandId: 3,
                carModelId: 11,
                mileage: 123,
            };

            const addedCar = await garageService.addCar(
                sid,
                newCarData.carBrandId,
                newCarData.carModelId,
                newCarData.mileage,
            );

            expect(addedCar.carBrandId).toBe(newCarData.carBrandId);
            expect(addedCar.carModelId).toBe(newCarData.carModelId);
            expect(addedCar.initialMileage).toBe(newCarData.mileage);

            expect(addedCar.brand).toBe('Ford');
            expect(addedCar.model).toBe('Fiesta');
            expect(addedCar.mileage).toBe(newCarData.mileage);

            addedCarsToRemove.push(addedCar.id);
        });

        test('Add new car - Audi TT', async () => {
            const newCarData = {
                carBrandId: 1,
                carModelId: 1,
                mileage: 124,
            };

            const addedCar = await garageService.addCar(
                sid,
                newCarData.carBrandId,
                newCarData.carModelId,
                newCarData.mileage,
            );

            expect(addedCar.carBrandId).toBe(newCarData.carBrandId);
            expect(addedCar.carModelId).toBe(newCarData.carModelId);
            expect(addedCar.initialMileage).toBe(newCarData.mileage);

            expect(addedCar.brand).toBe('Audi');
            expect(addedCar.model).toBe('TT');
            expect(addedCar.mileage).toBe(newCarData.mileage);

            addedCarsToRemove.push(addedCar.id);
        });

        test.afterAll('Remove added cars', async ({ request }) => {
            garageService = new GarageService(request);
            for (const id of addedCarsToRemove) {
                const responseJson = await garageService.removeCar(sid, id);
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
                garageService = new GarageService(request);
                removeBlockIds = await garageService.getAllUserCars(sid);
            },
        );

        test('Delete a car', async () => {
            if (removeBlockIds.length === 0) {
                console.log('User has no cars to delete');
                test.skip(
                    true,
                    'Skipping test because there are no cars to delete.',
                );
            }

            const carToRemoveId = removeBlockIds[0];
            const responseJson = await garageService.removeCar(
                sid,
                carToRemoveId,
            );
            const carId = responseJson.data.carId;

            expect(carId).toBe(carToRemoveId);
        });

        test('Delete a car with invalid ID', async () => {
            const responseJson = await garageService.removeCar(
                sid,
                182733,
                false,
            );
            expect(responseJson.message).toBe('Car not found');
        });
    });
});

import { APIRequestContext, expect } from '@playwright/test';

export default class GarageService {
    private request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllBrands() {
        const response = await this.request.get('/api/cars/brands');
        expect(response.status()).toBe(200);

        const responseJson = await response.json();
        return responseJson.data;
    }

    async getAllModels() {
        const response = await this.request.get('/api/cars/models');
        expect(response.status()).toBe(200);

        const responseJson = await response.json();
        return responseJson.data;
    }

    async getModel(id: number, isPositive = true) {
        const response = await this.request.get(`/api/cars/models/${id}`);
        if (isPositive) {
            expect(response.status()).toBe(200);

            const responseJson = await response.json();
            return responseJson.data;
        } else {
            return response;
        }
    }

    async addCar(
        sid: string,
        carBrandId: number,
        carModelId: number,
        mileage: number,
    ) {
        const response = await this.request.post('/api/cars', {
            data: {
                carBrandId,
                carModelId,
                mileage,
            },
            headers: {
                cookie: sid,
            },
        });

        expect(response.status()).toBe(201);

        const responseJson = await response.json();
        const addedCar = responseJson.data;

        expect(addedCar.id).toBeDefined();

        return addedCar;
    }

    async removeCar(sid: string, id: number, isPositive = true) {
        const response = await this.request.delete(`/api/cars/${id}`, {
            headers: { cookie: sid },
        });

        if (isPositive) {
            expect(response.status()).toBe(200);
        } else {
            expect(response.status()).toBe(404);
        }

        const responseJson = await response.json();

        return responseJson;
    }

    async getAllUserCars(sid: string) {
        const response = await this.request.get('/api/cars', {
            headers: { cookie: sid },
        });
        expect(response.status()).toBe(200);

        const responseJson = await response.json();
        const removeBlockIds = responseJson.data.map((car: any) => car.id);

        return removeBlockIds;
    }
}

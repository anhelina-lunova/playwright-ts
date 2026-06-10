import { APIRequestContext, expect } from '@playwright/test';

export default class AuthService {
    private request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async signIn(email: string, password: string, remember: boolean = false) {
        return this.request.post('/api/auth/signin', {
            data: {
                email,
                password,
                remember,
            },
        });
    }

    async getAuthCookie(email: string, password: string) {
        const responseAuth = await this.signIn(email, password);
        expect(responseAuth.status()).toBe(200);

        const sid = responseAuth.headers()['set-cookie'].split(';')[0];
        expect(sid).toContain('sid=');

        return sid;
    }
}

// const existingUserData = {
//             email: testUser1.email,
//             password: testUser1.password,
//             remember: false,
//         };
//         const responseAuth = await request.post('/api/auth/signin', {
//             data: existingUserData,
//         });
//         expect(responseAuth.status()).toBe(200);

//         sid = responseAuth.headers()['set-cookie'].split(';')[0];
//         expect(sid).toContain('sid=');

import { rmSync } from 'node:fs';

// Runs once per `playwright test` invocation (not on config reloads / retries)
export default async function globalSetup() {
    rmSync('artifacts/allure-results', { recursive: true, force: true });
}

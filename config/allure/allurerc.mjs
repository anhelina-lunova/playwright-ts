import { defineConfig } from 'allure';
import { env } from 'node:process';

export default defineConfig({
    name: 'Hillel Playwright Report',
    output: './artifacts/allure-report',
    historyPath: './config/allure/history.jsonl',
    appendHistory: true,

    // Fallback labels when tests omit metadata (non-overriding)
    // https://allurereport.org/docs/v3/configure/#defaultlabels
    defaultLabels: {
        severity: 'normal',
        layer: 'UI',
    },

    // Build/run context shown at top of awesome report
    // https://allurereport.org/docs/v3/configure/#variables
    // variables: {
    //     Environment: env.CI ? 'CI' : 'Local',
    //     ...(env.GITHUB_RUN_NUMBER && {
    //         'Build Number': `#${env.GITHUB_RUN_NUMBER}`,
    //     }),
    // },

    // Group critical/broken failures for triage (requires severity on tests)
    // https://allurereport.org/docs/v3/configure/#4-categories
    categories: {
        rules: [
            {
                name: 'Critical & blocker failures',
                id: 'critical-blocker-failures',
                matchers: {
                    statuses: ['failed', 'broken'],
                    labels: { severity: /^(critical|blocker)$/ },
                },
                groupBy: ['severity', 'layer', { label: 'feature' }],
                expand: true,
            },
        ],
    },

    plugins: {
        awesome: {
            options: {
                reportName: 'Hillel Playwright Report',
                singleFile: false,
                reportLanguage: 'uk',
                open: false,
                // BDD hierarchy from allure.epic / feature / story in tests
                // https://allurereport.org/docs/v3/configure/#awesome-plugin
                groupBy: ['epic', 'feature', 'story'],
            },
        },
    },
});

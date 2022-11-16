import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/scss/admin/admin.scss',
                'resources/scss/admin/login.scss',
                'resources/js/admin.js',
                'resources/js/login.js'
            ],
            refresh: true,
        }),
    ],
});

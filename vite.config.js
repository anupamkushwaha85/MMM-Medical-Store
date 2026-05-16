import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/MMM-Medical-Store/',
    plugins: [react()],
    server: {
        host: '0.0.0.0',
    },
});
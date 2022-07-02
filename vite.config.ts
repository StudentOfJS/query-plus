import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'queryPlus',
            formats: ['es', 'umd'],
            fileName: (format) => `queryPlus.${format}.js`,
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
});
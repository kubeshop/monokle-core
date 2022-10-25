import react from '@vitejs/plugin-react';
import path from 'node:path'
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            '@': `${__dirname}/src`,
            path: 'path-browserify',
          },
    },
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'monokle-core',
            formats: ['es', 'umd'],
            fileName: (format) => `lib.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'styled-components'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'styled-components': 'styled',
                },
            },
        },
    },
});

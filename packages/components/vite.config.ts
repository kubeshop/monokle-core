import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'monokle-core',
      formats: ['es', 'umd'],
      fileName: format => `lib.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'styled-components',
        'framer-motion',
        'antd',
        '@monokle/validation',
        'html-to-image',
        'jspdf',
        'elkjs'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          'framer-motion': 'framer',
          antd: 'antd',
          '@monokle/validation': 'monokle-validation',
          'html-to-image': 'htmlToImage',
          jspdf: 'jsPDF',
          elkjs: 'elkjs'
        },
      },
    },
  },
});

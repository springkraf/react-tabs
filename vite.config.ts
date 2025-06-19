import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  build: {
    //Specifies that the output of the build will be a library.
    lib: {
      //Defines the entry point for the library build. It resolves
      //to src/index.ts,indicating that the library starts from this file.
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-tabs',
      //A function that generates the output file
      //name for different formats during the build
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') return 'style.css';
          return assetInfo.name!;
        },
      },
    },
    //Generates sourcemaps for the built files,
    //aiding in debugging.
    sourcemap: true,
    //Clears the output directory before building.
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: 'esbuild',
  },
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
    viteCompression({
      algorithm: 'brotliCompress', // or 'gzip'
    }),
    visualizer({ open: true }),
  ],
});

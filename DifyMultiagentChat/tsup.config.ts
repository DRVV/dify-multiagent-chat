import { defineConfig } from 'tsup';
import cssModulesPlugin from 'esbuild-plugin-css-modules';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom'],
  splitting: true,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [
    cssModulesPlugin(),
  ],
});

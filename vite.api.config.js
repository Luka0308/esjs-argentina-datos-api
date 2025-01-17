import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import EsJS from '@es-js/vite-plugin-esjs';
import devServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    // Configuración del plugin EsJS
    EsJS(),
    // Configuración del servidor de desarrollo de Hono
    devServer({
      entry: './api/api.esjs',
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./api', import.meta.url)), // Alias para la carpeta `api`
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.esjs'], // Extensiones compatibles
  },

  build: {
    outDir: './dist', // Carpeta de salida
    emptyOutDir: true, // Limpia la carpeta antes de cada build
    rollupOptions: {
      input: './api/api.esjs', // Archivo principal de entrada
      output: {
        format: 'esm', // Formato del módulo de salida
        entryFileNames: 'servidor/[name].js', // Nombre del archivo de entrada
        chunkFileNames: 'servidor/[name].js', // Nombres de los chunks
        assetFileNames: 'servidor/[name].[ext]', // Nombres de los archivos de recursos
        exports: 'auto', // Exportación automática
      },
    },
  },
});

import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import EsJS from '@es-js/vite-plugin-esjs';
import devServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    EsJS(), // Plugin EsJS
    devServer({ entry: './api/api.esjs' }), // Configuración del servidor de desarrollo
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./api', import.meta.url)), // Alias para la carpeta `api`
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.esjs'], // Extensiones soportadas
  },
  build: {
    outDir: 'dist', // Carpeta de salida
    emptyOutDir: true, // Limpia la carpeta antes de cada build
    rollupOptions: {
      input: './api/api.esjs', // Archivo principal de entrada
      output: {
        format: 'esm', // Formato del módulo
        entryFileNames: 'servidor/[name].js', // Archivo principal
        chunkFileNames: 'servidor/[name].js', // Archivos adicionales
        assetFileNames: 'servidor/[name].[ext]', // Recursos adicionales
        exports: 'auto', // Exportación automática
      },
    },
  },
});

import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc'
    })
  ],
  optimizeDeps: {
    // Vite does not work well with optionnal dependencies,
    // mark them as ignored for now
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger'
    ]
  }
})

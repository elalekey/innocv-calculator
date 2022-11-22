/// <reference types="vitest" />
import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSvgPlugin from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: join(__dirname, '/node_modules/$1')
      },

      {
        find: /@\//,
        replacement: join(__dirname, './src/')
      }
    ]
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  },
  plugins: [
    vue(),
    vueSvgPlugin({
      svgoConfig: {
        multipass: true,

        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeTitle: false
              }
            }
          },
          'removeDimensions',
          {
            name: 'sortAttrs',
            params: {
              xmlnsOrder: 'alphabetical'
            }
          },
          {
            name: 'cleanupListOfValues',
            params: {
              floatPrecision: 0
            }
          },
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ preserveAspectRatio: 'none' }]
            }
          }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global-imports.scss";`
      }
    }
  }
})

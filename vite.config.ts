import react from '@vitejs/plugin-react'
import path from 'node:path'
import { resolve } from 'path'
import { UserConfig } from 'vite'
import Checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

const config: UserConfig = {
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: `${pathResolve('src')}/`
      }
    ]
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    }),
    Checker({
      typescript: true,
      overlay: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"' // for example, lint .ts & .tsx
      }
    })
  ],
  define: {
    global: {}
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'jpe-mui-components',
      formats: ['es', 'umd'],
      fileName: format => `jpe-mui-components.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'], //TODO: Externalize MUI
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
}

/* "define" prevents
 * Uncaught ReferenceError: global is not defined
 */

const getConfig = () => config

export default getConfig

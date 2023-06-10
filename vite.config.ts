import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [
    uni(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
    })
  ],

  resolve: {
    // 配置路径别名
    alias: {
      '@': '/src'
    }
  }
})

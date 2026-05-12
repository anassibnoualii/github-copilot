import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import path from 'path'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode as any, { theme: 'github-dark' }]],
      providerImportSource: '@mdx-js/react',
    }),
    react(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  base: '/github-copilot/',
})

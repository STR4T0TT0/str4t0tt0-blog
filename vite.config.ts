import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Il faut les quatres pour gérer le markdown
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'


export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    mdx({ remarkPlugins: [ remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }]]})
  ],    
  resolve: { alias: { '@': '/src'  },}
})

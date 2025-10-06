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
    // MDX ne doit PAS matcher les .md mais uniquement .mdx sinon rien s'affiche
    mdx({
      include: [/\.mdx$/],
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
    }),
   ],      
  resolve: { alias: { '@': '/src'  },},
  // Forcer Vite à traiter les .md comme des assets "bruts"
assetsInclude: ['**/*.md']
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Il faut les quatres pour gérer le markdown
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'


export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    mdx({
      mdExtensions: ['.md'], // assure aussi le rendu .md via MDX
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    }),
   ],      
  resolve: { alias: { '@': '/src'  },},
  // Forcer Vite à traiter les .md comme des assets "bruts"
assetsInclude: ['**/*.md']
})

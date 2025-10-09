import { MDXProvider as Provider } from '@mdx-js/react'

export default function MDXProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}
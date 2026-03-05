import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    alias: {
      '$lib': '/home/user/reddyontheroad.com/src/lib',
    },
  },
})

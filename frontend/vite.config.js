import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
})

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{

//     host:'10.112.72.30',


//     port:3000,
//   }
// })
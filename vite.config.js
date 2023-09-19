import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({ 
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg','error.svg'],
            manifest:{
                name: 'Advanced Finance Manager',
                short_name: 'AFM',
                description: 'App to manage and keep track of your finances.',
                "icons": [
                    {
                    "src": "favicon.svg",
                    "sizes": "16x16",
                    "type": "image/svg"
                    },
                    {
                        "src": "favicon.svg",
                        "sizes": "192x192",
                        "type": "image/svg"
                    },
                    {
                        "src": "favicon.svg",
                        "sizes": "512x512",
                        "type": "image/svg"
                    },
                ],
                "start_url": "",
                "display":"standalone",
                theme_color:"#000000"
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            injectRegister: 'auto'
        })
    ],
    build:{
        target:"esnext"
    },
    base: '/Advanced-Finance-Manager/'
})

import { URL, fileURLToPath } from 'node:url'
import { defineConfigWithTheme, loadEnv } from 'vitepress'
import { useOpenapi, useSidebar } from 'vitepress-theme-openapi'
import spec from '../public/openapi.json' assert { type: 'json' }

const env = loadEnv('', process.cwd())

const gTag = env.VITE_GTAG

const openapi = useOpenapi()
openapi.setSpec(spec)
const sidebar = useSidebar()

function addDocsPrefix(group) {
  return {
    ...group,
    items: group.items.map((item) => {
      return {
        ...item,
        link: `/docs${item.link}`,
      }
    }),
  }
}

export default defineConfigWithTheme({
  title: 'ArgentinaDatos API',
  description: 'API para diferentes datos de Argentina',

  themeConfig: {
    logo: '/assets/logo.webp',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/enzonotario/esjs-argentina-datos-api' },
    ],
    outline: [1, 3],
    sidebar: [
      {
        text: `<span class="SidebarItem">
        <svg class="i-mdi-home w-5 h-5" />
        <span class="SidebarItem-text">Inicio</span>
      </span>`,
        link: '/',
      },
      {
        text: `<span class="SidebarItem">
        <svg class="i-mdi-github w-5 h-5" />
        <span class="SidebarItem-text">GitHub</span>
      </span>`,
        link: 'https://github.com/enzonotario/esjs-dolar-api',
      },
      {
        text: 'Datos',
        items: [
          addDocsPrefix(sidebar.generateSidebarGroup('Datos')),
        ],
      },
      {
        text: 'Cotizaciones históricas',
        items: [
          addDocsPrefix(sidebar.generateSidebarGroup('Cotizaciones históricas')),
        ],
      },
      {
        text: 'API',
        items: [
          addDocsPrefix(sidebar.generateSidebarGroup('API')),
        ],
      },
    ],
  },

  head: [
    // Google Analytics
    [
      'script',
      { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gTag}` },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gTag}');`,
    ],

    // Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
        rel: 'stylesheet',
      },
    ],
  ],

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  },
})

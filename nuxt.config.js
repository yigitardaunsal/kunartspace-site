export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Kun Art Space',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
				crossorigin: ''
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['@/assets/scss/main.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: [
		{
			path: '~/components',
			pathPrefix: false
		}
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module'
		// https://go.nuxtjs.dev/tailwindcss
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@nuxtjs/style-resources',
		'@nuxtjs/i18n'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/'
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	styleResources: {
		scss: ['./assets/scss/abstracts/*.scss']
	},

	i18n: {
		locales: ['tr', 'en'],
		defaultLocale: 'tr',
		vueI18n: {
			fallbackLocale: 'tr',
			messages: {
				tr: {
					exhibitions: 'Sergiler'
				},
				en: {
					exhibitions: 'Exhibitions'
				}
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend: (config) => {
			const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

			svgRule.test = /\.(png|jpe?g|gif|webp)$/

			config.module.rules.push({
				test: /\.svg$/,
				use: ['babel-loader', 'vue-svg-loader']
			})
		}
	}
}

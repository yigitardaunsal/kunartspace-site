export default function ({ $axios, i18n, store }, inject) {
	const api = $axios.create({ withCredentials: true })

	api.interceptors.request.use((config) => {
		config.headers.locale = i18n.locale
		if (store.state.accessToken) {
			config.headers.Authorization = `Berar ${store.state.accessToken}`
		}
		return config
	})

	// api.interceptors.response.use(
	// 	(response) => {
	// 		const cookies = response.headers['set-cookie']
	// 		if (cookies) {
	// 			cookies.forEach((cookie) => {
	// 				document.cookie = cookie
	// 			})
	// 		}
	// 		return response
	// 	},
	// 	(error) => {
	// 		return Promise.reject(error)
	// 	}
	// )

	inject('api', api)
}

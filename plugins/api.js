export default function ({ $axios, i18n, store }, inject) {
	const api = $axios.create()

	api.interceptors.request.use((config) => {
		config.headers.locale = i18n.locale
		if (store.state.accessToken) {
			config.headers.Authorization = `Berar ${store.state.accessToken}`
		}
		return config
	})

	inject('api', api)
}

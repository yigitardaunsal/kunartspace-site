export default function ({ store, ssrContext }) {
	if (process.client) {
		store.dispatch('initAuth')
		return
	}

	store.dispatch('initAuth', ssrContext.req)
}

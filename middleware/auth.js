export default function ({ store, redirect }) {
	if (!store.getters.getIsAuthenticated) {
		redirect('/store/customer/login')
	}
}

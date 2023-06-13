export default {
	computed: {
		customerUrl() {
			if (this.inCustomerPages) {
				return this.localePath({
					name: 'store-customer-login'
				})
			}

			return this.$store.getters.getIsAuthenticated
				? this.localePath({ name: 'store-customer' })
				: this.localePath({ name: 'store-customer-login', query: { returnUrl: this.$route.path } })
		},
		inCustomerPages() {
			return this.$route.path.includes('customer')
		}
	}
}

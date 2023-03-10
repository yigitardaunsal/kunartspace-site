export default {
	data() {
		return {
			loading: true
		}
	},
	computed: {
		cart() {
			return this.$store.state.cart
		}
	},
	created() {
		this.fetchCart()
	},
	methods: {
		async fetchCart() {
			await this.$store.dispatch('fetchCart')
			this.loading = false
		}
	}
}

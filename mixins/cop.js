export default {
	data() {
		return {
			loading: true,
			overstock: false
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
		},
		anyOverstock(val) {
			this.overstock = val
		},
		getPrice(discountedPrice, price) {
			return discountedPrice || price
		}
	}
}

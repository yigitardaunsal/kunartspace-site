export default {
	watch: {
		$route() {
			this.closeMobileMenu()
		}
	},
	methods: {
		closeMobileMenu() {
			this.$store.commit('SET_IS_OPEN_MOBILE_MENU', false)
		}
	},
	created() {
		this.closeMobileMenu()
	}
}

<template>
	<Modal :is-open="isOpen" title="Ürün arama" @close="closeModal">
		<form @submit="search" class="search-form">
			<Textbox ref="searchInput" v-model="searchText" name="search" placeholder="Ürün veya sanatçı adı" />
			<Button variant="primary">Ara</Button>
		</form>
	</Modal>
</template>

<script>
export default {
	name: 'TheSearchModal',
	data() {
		return {
			searchText: ''
		}
	},
	computed: {
		isOpen() {
			return this.$store.state.isOpenSearchModal
		}
	},
	watch: {
		isOpen() {
			this.$nextTick(() => {
				this.searchText = ''
				const searchInput = this.$refs.searchInput
				if (searchInput) {
					searchInput.$el.querySelector('input').focus()
				}
			})
		}
	},
	methods: {
		closeModal() {
			this.$store.commit('SET_IS_OPEN_SEARCH_MODAL', false)
		},
		search() {
			this.$router.push(this.localeLocation({ name: 'store-products', query: { q: this.searchText } }))
			this.closeModal()
		}
	}
}
</script>

<style lang="scss" scoped>
.search-form {
	display: grid;
	grid-template-rows: 1fr auto;
	gap: pxToRem(5);

	@include respond-to('x-large') {
		grid-template-columns: 1fr auto;
	}
}
</style>

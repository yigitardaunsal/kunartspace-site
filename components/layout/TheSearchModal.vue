<template>
	<Modal :is-open="isOpen" title="Ürün arama" @close="closeModal">
		<Form @submit="search">
			<FormRow>
				<Textbox v-model="searchText" name="search" placeholder="Ürün veya sanatçı adı" rules="required" />
			</FormRow>
		</Form>
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

<style lang="scss" scoped></style>

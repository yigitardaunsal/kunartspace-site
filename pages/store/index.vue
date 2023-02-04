<template>
	<div class="store">
		<section class="hero container">
			<ExhibitionSlider :exhibition-list="exhibitionList" />
		</section>
		<section class="current-works">
			<CurrentWorks :works="currentWorks" />
		</section>
		<section class="selected-artists container">
			<SelectedArtists :artists="selectedArtists" />
		</section>
		<section class="selected-works container-fluid">
			<SelectedWorks :works="selectedWorks" />
		</section>
	</div>
</template>

<script>
export default {
	name: 'StorePage',
	layout: 'StoreLayout',
	nuxtI18n: {
		paths: {
			tr: '/magaza',
			en: '/store'
		}
	},
	async asyncData({ store, $api }) {
		await store.dispatch('fetchExhibitionList')
		const currentWorks = await $api.get('/fields/get/current-works')
		const selectedArtists = await $api.get('/fields/get/selected-artists')
		const selectedWorks = await $api.get('/fields/get/selected-works')
		return {
			currentWorks: currentWorks.data.items,
			selectedArtists: selectedArtists.data.items,
			selectedWorks: selectedWorks.data.items
		}
	},
	computed: {
		exhibitionList() {
			return this.$store.state.exhibitionList
		}
	}
}
</script>

<style lang="scss" scoped>
.hero {
	margin-top: px2rem(48);
	margin-bottom: px2rem(100);
}

.current-works {
	margin-bottom: px2rem(86);
}

.selected-artists {
	margin-bottom: px2rem(92);
}
</style>

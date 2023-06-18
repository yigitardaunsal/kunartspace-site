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
		const [currentWorks, selectedArtists, selectedWorks] = await Promise.all([
			$api.get('/fields/get/current-works'),
			$api.get('/fields/get/selected-artists'),
			$api.get('/fields/get/selected-works'),
			store.dispatch('fetchExhibitionList')
		])

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
	margin-top: 0;
	margin-bottom: pxToRem(20);

	@include respond-to('x-large') {
		margin-top: pxToRem(48);
		margin-bottom: pxToRem(100);
	}
}

.current-works {
	margin-bottom: pxToRem(86);
}

.selected-artists {
	margin-bottom: pxToRem(92);
}
</style>

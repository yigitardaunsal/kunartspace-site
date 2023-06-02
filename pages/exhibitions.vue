<template>
	<div class="container">
		<div v-if="currentExhibition" class="current-exhibition">
			<PageHeadline>{{ $t('exhibitionPage.currentExhibition') }}</PageHeadline>
			<ExhibitionCard :exhibition="currentExhibition" />
		</div>
		<div v-if="exhibitionList.length" class="exhibitions">
			<PageHeadline :tag="pastExhibitionsTag" size="sm">{{ $t('exhibitionPage.pastExhibitions') }}</PageHeadline>
			<div v-for="(exhibition, index) in exhibitionList" :key="index" class="exhibitions__item">
				<ExhibitionCard :exhibition="exhibition" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ExhibitionsPage',
	nuxtI18n: {
		paths: {
			tr: '/sergiler',
			en: '/exhibitions'
		}
	},
	async asyncData({ store }) {
		await store.dispatch('fetchExhibitionList')
	},
	computed: {
		currentExhibition() {
			return this.$store.getters.getCurrentExhibition
		},
		exhibitionList() {
			return this.$store.getters.getExhibitionListWithoutCurrent
		},
		pastExhibitionsTag() {
			return this.currentExhibition ? 'h2' : 'h1'
		}
	}
}
</script>

<style lang="scss" scoped>
.current-exhibition {
	margin-bottom: pxToRem(100);
}

.exhibitions {
	margin-bottom: pxToRem(132);

	&__item {
		margin-bottom: pxToRem(50);

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>

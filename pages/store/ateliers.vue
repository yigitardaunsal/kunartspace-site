<template>
	<div class="container">
		<div v-if="currentAtelier" class="current-atelier">
			<PageHeadline>{{ $t('atelierPage.currentAteliers') }}</PageHeadline>
			<AtelierCard :atelier="currentAtelier" />
		</div>
		<div v-if="atelierList.length" class="ateliers">
			<PageHeadline :tag="pastAteliersTag" size="sm">{{ $t('atelierPage.pastAteliers') }}</PageHeadline>
			<div v-for="(atelier, index) in atelierList" :key="index" class="ateliers__item">
				<AtelierCard :atelier="atelier" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AteliersPage',
	layout: 'StoreLayout',
	nuxtI18n: {
		paths: {
			tr: '/magaza/atolyeler',
			en: '/store/ateliers'
		}
	},
	async asyncData({ $api, $moment, i18n }) {
		const { data } = await $api.get('ateliers/get-list')
		const ateliers = data.map((atelier) => {
			let startDateFormat = 'DD MMMM YYYY'
			let endDate = ''
			if (atelier.endDate) {
				startDateFormat = 'DD MMMM'
				endDate = ' - '
				endDate += $moment(atelier.endDate).locale(i18n.locale).format('DD MMMM YYYY')
			}

			return {
				...atelier,
				date: $moment(atelier.startDate).locale(i18n.locale).format(startDateFormat) + endDate
			}
		})

		return {
			ateliers
		}
	},
	computed: {
		currentAtelier() {
			return this.ateliers.find((atelier) => atelier.isCurrent)
		},
		atelierList() {
			return this.ateliers.filter((atelier) => !atelier.isCurrent)
		},
		pastAteliersTag() {
			return this.currentAtelier ? 'h2' : 'h1'
		}
	}
}
</script>

<style lang="scss" scoped>
.current-atelier {
	margin-bottom: pxToRem(100);
}

.ateliers {
	margin-bottom: pxToRem(132);

	&__item {
		margin-bottom: pxToRem(50);

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>

<template>
	<div class="customer-page">
		<div class="customer-page__header">
			<PageHeadline variant="customer" :bordered="false">{{ $t('customer.favourites.title') }}</PageHeadline>
		</div>
		<div class="customer-page__body row">
			<div v-for="(work, index) in works" :key="index" class="col-md-6">
				<WorkCard :work="work" />
			</div>
		</div>
	</div>
</template>

<script>
import WorkCard from '@/components/store/works/WorkCard'

export default {
	name: 'CustomerOrders',
	components: {
		WorkCard
	},
	layout: 'CustomerLayout',
	async asyncData({ $api }) {
		const { data } = await $api.get('/customers/get-favorites')

		return {
			works: data
		}
	},
	nuxtI18n: {
		paths: {
			tr: '/store/customer/favourites',
			en: '/store/customer/favourites'
		}
	}
}
</script>

<style lang="scss" scoped>
.order + .order {
	margin-top: px2rem(25);
}
</style>

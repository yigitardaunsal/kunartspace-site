<template>
	<div class="customer-page">
		<div class="customer-page__header">
			<PageHeadline variant="customer" :bordered="false">{{ $t('customer.orders.title') }}</PageHeadline>
		</div>
		<div class="customer-page__body">
			<div v-for="(order, index) in orders" :key="index" class="order">
				<OrderCard :order="order" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerOrders',
	layout: 'CustomerLayout',
	async asyncData({ $api, $moment, i18n }) {
		const { data } = await $api.get('/customers/get-orders')

		const orders = data.map((order) => ({
			...order,
			date: $moment(order.createdAt).locale(i18n.locale).format('DD MMMM YYYY HH:MM')
		}))

		return {
			orders
		}
	},
	nuxtI18n: {
		paths: {
			tr: '/store/customer',
			en: '/store/customer'
		}
	}
}
</script>

<style lang="scss" scoped>
.order + .order {
	margin-top: px2rem(72);
}
</style>

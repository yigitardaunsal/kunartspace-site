<template>
	<div class="customer-page">
		<div class="customer-page__header">
			<PageHeadline variant="customer" :bordered="false">{{ $t('customer.orders.title') }}</PageHeadline>
		</div>
		<div class="customer-page__body">
			<template v-if="orders.length">
				<div v-for="(order, index) in orders" :key="index" class="order">
					<OrderCard :order="order" />
				</div>
			</template>
			<template v-else>
				<Alert variant="warning">{{ $t('customer.orders.empty') }}</Alert>
			</template>
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
	margin-top: pxToRem(72);
}
</style>

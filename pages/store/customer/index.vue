<template>
	<div class="customer-page">
		<PageHeadline variant="customer" :bordered="false">{{ $t('customer.orders.title') }}</PageHeadline>
		<div v-for="(order, index) in orders" :key="index" class="order">
			<OrderCard :order="order" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerPage',
	layout: 'CustomerLayout',
	asyncData({ $moment, i18n }) {
		const data = [
			{
				date: '2023-01-15T19:24:43.427Z',
				customer: 'Yiğit Arda Ünsal',
				amount: 23000,
				work: {
					picture: 'http://test-api.kunartspace.com/public/images/works/untitled-1669711360794.jpeg',
					artist: 'Dicle Çiftçi',
					name: 'Bang Bang',
					description: 'Tuval üzeri yağlı boya ve akrilik - 80x80 cm - 2022'
				}
			},
			{
				date: '2023-01-10T19:24:43.427Z',
				customer: 'Yiğit Arda Ünsal',
				amount: 10000,
				work: {
					picture: 'http://test-api.kunartspace.com/public/images/works/untitled2-1669711360805.jpeg',
					artist: 'Dicle Çiftçi',
					name: 'Bang Bang',
					description: 'Tuval üzeri yağlı boya ve akrilik - 80x80 cm - 2023'
				}
			},
			{
				date: '2023-01-01T19:24:43.427Z',
				customer: 'Yiğit Arda Ünsal',
				amount: 12500,
				work: {
					picture: 'http://test-api.kunartspace.com/public/images/works/untitled2-1669711360805.jpeg',
					artist: 'Dicle Çiftçi',
					name: 'Bang Bang',
					description: 'Tuval üzeri yağlı boya ve akrilik - 80x80 cm - 2023'
				}
			}
		]

		const orders = data.map((order) => ({
			...order,
			date: $moment(order.date).locale(i18n.locale).format('DD MMMM YYYY HH:MM')
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
	margin-top: px2rem(25);
}
</style>

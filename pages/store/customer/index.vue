<template>
	<div class="customer-page">
		<PageHeadline variant="customer" :bordered="false">{{ $t('customer.orders.title') }}</PageHeadline>
	</div>
</template>

<script>
export default {
	name: 'CustomerPage',
	layout: 'CustomerLayout'
}
</script>

<style lang="scss" scoped></style>

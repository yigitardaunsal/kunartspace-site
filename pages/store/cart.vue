<template>
	<div class="cart container">
		<div class="cart__header">
			<PageHeadline variant="customer" position="center" :bordered="false">{{ $t('cartPage.title') }}</PageHeadline>
		</div>
		<div v-if="loading" class="cart__loader">
			<CircleLoader size="100" />
		</div>
		<template v-else>
			<template v-if="cart.products.length">
				<div class="cart__body">
					<CartProducts :products="products" @overstock="anyOverstock" />
				</div>
				<div class="cart__footer">
					<CartSummary>
						<template #button>
							<Button v-if="overstock" size="large" block disabled>{{ $t('cartPage.checkoutNow') }}</Button>
							<nuxt-link
								v-else
								:to="localePath({ name: 'store-checkout' })"
								tag="a"
								class="btn --primary --block --lg"
								>{{ $t('cartPage.checkoutNow') }}</nuxt-link
							>
						</template>
					</CartSummary>
				</div>
			</template>
			<EmptyCart v-else />
		</template>
	</div>
</template>

<script>
import copMixin from '@/mixins/cop'

export default {
	name: 'CartPage',
	mixins: [copMixin],
	layout: 'StoreLayout'
}
</script>

<style lang="scss" scoped>
.cart {
	&__header {
		margin-bottom: px2rem(90);
	}

	&__loader {
		position: relative;
		height: px2rem(20);
		color: $dark-gray;
	}

	&__body {
		margin-bottom: px2rem(55);
	}
}
</style>

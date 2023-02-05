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
					<CartProducts />
				</div>
				<div class="cart__footer">
					<CartSummary>
						<template #button>
							<nuxt-link to="#" tag="a" class="btn --primary --block --lg">{{ $t('cartPage.checkoutNow') }}</nuxt-link>
						</template>
					</CartSummary>
				</div>
			</template>
			<div v-else class="empty">
				<div class="empty__icon">
					<BasketIcon width="200" height="200" />
				</div>
				<h2 class="empty__title">
					{{ $t('cartPage.empty.title') }}
				</h2>
				<nuxt-link :to="localePath({ name: 'store-works' })" tag="a" class="btn --tertiary">{{
					$t('cartPage.empty.keepShopping')
				}}</nuxt-link>
			</div>
		</template>
	</div>
</template>

<script>
import BasketIcon from '@/assets/svg/basket.svg'

export default {
	name: 'CartPage',
	layout: 'StoreLayout',
	components: {
		BasketIcon
	},
	nuxtI18n: {
		paths: {
			tr: '/store/cart',
			en: '/store/cart'
		}
	},
	data() {
		return {
			loading: true
		}
	},
	computed: {
		cart() {
			return this.$store.state.cart
		}
	},
	methods: {
		async fetchCart() {
			await this.$store.dispatch('fetchCart')
			this.loading = false
		}
	},
	created() {
		this.fetchCart()
	}
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

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: px2rem(20);
		margin-top: px2rem(-45);
	}

	&__body {
		margin-bottom: px2rem(55);
	}
}
</style>

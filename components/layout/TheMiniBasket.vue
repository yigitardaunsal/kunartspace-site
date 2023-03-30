<template>
	<div class="mini-basket">
		<section v-if="cart.loading" class="mini-basket__loading">
			<CircleLoader :size="40" />
		</section>
		<template v-else>
			<section v-if="!cart.products.length" class="mini-basket__empty">
				<span class="mini-basket__text">{{ $t('miniBasket.noItem') }}</span>
			</section>
			<template v-else>
				<section class="mini-basket__products">
					<nuxt-link v-for="(product, index) in cart.products" :key="index" to="#" tag="a" class="product">
						<span class="product__picture">
							<img :src="product.picture" :alt="product.name" />
						</span>
						<span class="product__content">
							<strong class="product__title"> {{ product.artist }} - {{ product.name }} </strong>
							<span class="product__price">
								{{ getPrice(product.totalDiscountedPrice, product.totalPrice) | currency }}
								<template v-if="product.hasVat">(+{{ $t('vat') }})</template>
							</span>
						</span>
					</nuxt-link>
				</section>
				<div class="mini-basket__footer">
					<nuxt-link :to="localePath({ name: 'store-cart' })" tag="a" class="btn --tertiary --sm --block">{{
						$t('miniBasket.showCart')
					}}</nuxt-link>
					<nuxt-link :to="localePath({ name: 'store-checkout' })" tag="a" class="btn --primary --sm --block">{{
						$t('miniBasket.proceedPay')
					}}</nuxt-link>
					<span class="mini-basket__close">{{ $t('miniBasket.keepShopping') }}</span>
				</div>
			</template>
		</template>
	</div>
</template>

<script>
import copMixin from '@/mixins/cop'

export default {
	name: 'TheMiniBasket',
	mixins: [copMixin],
	computed: {
		cart() {
			return this.$store.state.cart
		}
	}
}
</script>

<style lang="scss" scoped>
.mini-basket {
	position: absolute;
	z-index: 2;
	top: calc(100% + px2rem(30));
	right: px2rem(-115);
	border-radius: px2rem(10);
	width: px2rem(366);
	padding: px2rem(34) px2rem(20) px2rem(18);
	background-color: $f3-light-gray;

	&__text {
		font-size: px2rem(14);
		line-height: px2rem(21);
		text-align: center;
		color: $dark-gray;
	}

	&__loading {
		position: relative;
		height: 40px;
		margin-bottom: px2rem(16);
	}

	&__empty {
		margin-bottom: px2rem(16);
		text-align: center;
	}

	&__products {
		margin-bottom: px2rem(45);
		.product {
			display: flex;
			gap: px2rem(26);
			margin-bottom: px2rem(15);
			font-size: px2rem(15);
			color: $darklighten;

			&:last-child {
				margin-bottom: 0;
			}

			&:hover {
				color: $dark-gray;
			}

			&__picture {
				flex-shrink: 0;
				width: px2rem(92);
				height: px2rem(100);

				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}

			&__content {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
			}

			&__title {
				font-weight: 500;
			}
		}
	}

	&__footer {
		display: flex;
		flex-direction: column;
		gap: px2rem(16);
	}

	&__close {
		display: block;
		font-size: px2rem(14);
		line-height: px2rem(38);
		text-align: center;
		color: $dark-gray;
		cursor: pointer;
	}
}
</style>

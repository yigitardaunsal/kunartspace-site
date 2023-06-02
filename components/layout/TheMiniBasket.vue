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
								{{ whichPrice(product.totalDiscountedPrice, product.totalPrice) | currency }}
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
import helpersMixin from '@/mixins/helpers'

export default {
	name: 'TheMiniBasket',
	mixins: [helpersMixin],
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
	top: calc(100% + pxToRem(30));
	right: pxToRem(-115);
	border-radius: pxToRem(10);
	width: pxToRem(366);
	padding: pxToRem(34) pxToRem(20) pxToRem(18);
	background-color: $f3-light-gray;

	&__text {
		font-size: pxToRem(14);
		line-height: pxToRem(21);
		text-align: center;
		color: $dark-gray;
	}

	&__loading {
		position: relative;
		height: 40px;
		margin-bottom: pxToRem(16);
	}

	&__empty {
		margin-bottom: pxToRem(16);
		text-align: center;
	}

	&__products {
		margin-bottom: pxToRem(45);
		.product {
			display: flex;
			gap: pxToRem(26);
			margin-bottom: pxToRem(15);
			font-size: pxToRem(15);
			color: $darklighten;

			&:last-child {
				margin-bottom: 0;
			}

			&:hover {
				color: $dark-gray;
			}

			&__picture {
				flex-shrink: 0;
				width: pxToRem(92);
				height: pxToRem(100);

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
		gap: pxToRem(16);
	}

	&__close {
		display: block;
		font-size: pxToRem(14);
		line-height: pxToRem(38);
		text-align: center;
		color: $dark-gray;
		cursor: pointer;
	}
}
</style>

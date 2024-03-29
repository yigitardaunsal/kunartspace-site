<template>
	<div class="products">
		<div class="products__header">
			<div class="row">
				<div class="col-md-3">{{ $t('cartProducts.product') }}</div>
				<div class="col-md-3 offset-md-1">{{ $t('cartProducts.details') }}</div>
				<div class="col-md-2 offset-md-1">{{ $t('cartProducts.amount') }}</div>
				<div class="col-md-2">{{ $t('cartProducts.total') }}</div>
			</div>
		</div>
		<div class="products__body">
			<div v-for="product in products" :key="product.id" class="product">
				<div class="row align-items-center">
					<div class="col-md-3">
						<nuxt-link
							:to="localePath({ name: 'store-product', params: { slug: product.link } })"
							tag="a"
							class="product__picture"
						>
							<img :src="product.picture" :alt="product.title" class="img-contain" />
						</nuxt-link>
					</div>
					<div class="col-md-3 offset-md-1">
						<h3 class="product__artist">{{ product.artist }}</h3>
						<h5 class="product__name">{{ product.name }}</h5>
						<p class="product__description">{{ product.description }}</p>
					</div>
					<div class="col-md-2 offset-md-1">
						<template v-if="quantityChangeable">
							<div
								class="amount"
								:class="{
									'--loading': quantityLoader.includes(product.id),
									'--error': product.availableQuantity !== product.quantity
								}"
							>
								<div v-if="quantityLoader.includes(product.id)" class="amount__loader">
									<CircleLoader :size="20" />
								</div>
								<template v-else>
									<button
										class="amount__button"
										@click="changeQuantity({ productId: product.id, quantity: product.quantity - 1 })"
									>
										-
									</button>
									<span class="amount__value">{{ product.quantity }}</span>
									<button
										class="amount__button"
										:disabled="product.availableQuantity !== product.quantity"
										@click="changeQuantity({ productId: product.id, quantity: product.quantity + 1 })"
									>
										+
									</button>
								</template>
							</div>
							<div v-if="product.availableQuantity !== product.quantity" class="error">
								<template v-if="product.outOfStock">
									{{ $t('cartPage.messages.outOfStock') }}
								</template>
								<template v-else>
									{{ $t('cartPage.messages.availableQuantity').replace('%d%', product.availableQuantity) }}
								</template>
							</div>
						</template>
						<template v-else>
							<div class="product__amount">
								<span class="product__amount-text">{{ $t('cartProducts.amount') }} :</span> {{ product.quantity }}
							</div>
						</template>
					</div>
					<div class="col-md-2">
						<span class="product__price"
							>{{ whichPrice(product.totalDiscountedPrice, product.totalPrice) | currency }} + {{ $t('vat') }}</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import helpersMixin from '@/mixins/helpers'

export default {
	name: 'CartProducts',
	props: {
		products: {
			type: Array,
			required: true
		},
		quantityChangeable: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	mixins: [helpersMixin],
	data() {
		return {
			quantityLoader: []
		}
	},
	watch: {
		products() {
			this.checkOverstock()
		}
	},
	methods: {
		async changeQuantity(payload) {
			this.quantityLoader.push(payload.productId)

			const response = await this.$store.dispatch('changeQuantity', payload)

			if (response?.status === 406) {
				this.$toast.open({
					message: this.$t('cartPage.messages.notAcceptable'),
					type: 'error'
				})
			}

			this.quantityLoader = this.quantityLoader.filter((item) => item !== response?.productId)
		},
		checkOverstock() {
			const anyOverstock = this.products.find((p) => p.quantity > p.availableQuantity)
			this.$emit('overstock', !!anyOverstock)
		}
	},
	mounted() {
		this.checkOverstock()
	}
}
</script>

<style lang="scss" scoped>
.products {
	&__header {
		display: none;
		margin-bottom: pxToRem(48);
		border-bottom: 1px solid $graylighten;
		padding-bottom: pxToRem(52);
		font-size: pxToRem(18);
		line-height: pxToRem(27);
	}

	&__body {
		border-bottom: 1px solid $graylighten;

		.product {
			margin-bottom: pxToRem(46);
			border-bottom: 1px solid $graylighten;
			padding-bottom: pxToRem(46);

			&:last-child {
				border-bottom: none;
				padding-bottom: 0;
			}

			&__picture {
				display: block;
				width: 100%;
				height: pxToRem(200);
			}

			&__artist {
				margin-bottom: pxToRem(16);
				font-size: pxToRem(18);
				line-height: pxToRem(27);
				font-weight: 400;
			}

			&__name {
				margin-bottom: pxToRem(16);
				font-size: pxToRem(16);
				line-height: pxToRem(24);
				font-weight: 400;
				color: $dark-gray;
			}

			&__description {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				margin-bottom: 0;
				font-size: pxToRem(14);
				line-height: pxToRem(21);
				text-overflow: ellipsis;
				color: $dark-gray;
			}

			&__amount {
				margin: pxToRem(20) 0;
			}

			&__price {
				font-size: pxToRem(18);
				line-height: pxToRem(26);
			}

			@include respond-to('x-large') {
				border-bottom: none;
				padding-bottom: 0;

				&__amount {
					margin: 0;

					&-title {
						display: none;
					}
				}
			}

			.amount {
				display: flex;
				align-items: center;
				margin: pxToRem(20) 0;
				border: 1px solid;
				border-radius: pxToRem(4);
				width: pxToRem(150);
				font-size: pxToRem(18);
				color: $b-gray;

				&:not(.--loading):hover {
					color: $dark-gray;
				}

				&.--error {
					margin-bottom: pxToRem(10);
					color: $alizarin;

					&:hover {
						color: $alizarin;
					}
				}

				&__loader {
					position: relative;
					width: 100%;
					height: pxToRem(40);
				}

				&__button {
					flex: 1;
					border: none;
					height: pxToRem(40);
					padding: 0;
					background-color: transparent;
					font-size: inherit;
					color: inherit;
				}

				&__value {
					flex: 1;
					text-align: center;
				}

				@include respond-to('x-large') {
					margin: 0;
				}
			}

			.error {
				font-size: pxToRem(14);
				color: $alizarin;
			}
		}
	}

	@include respond-to('x-large') {
		&__header {
			display: block;
		}
	}
}
</style>

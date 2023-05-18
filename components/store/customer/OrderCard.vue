<template>
	<div class="order-card">
		<div class="order-card__header row">
			<div class="col-md-3">
				<div class="info">
					<div class="info__title">{{ $t('customer.orders.orderNo') }}</div>
					<div class="info__text">{{ order.conversationId }}</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="info">
					<div class="info__title">{{ $t('customer.orders.status') }}</div>
					<div class="info__text">{{ status }}</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="info">
					<div class="info__title">{{ $t('customer.orders.orderDate') }}</div>
					<div class="info__text">{{ order.date }}</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="info">
					<div class="info__title">{{ $t('customer.orders.amount') }}</div>
					<div class="info__text">{{ order.amount | currency }}</div>
				</div>
			</div>
		</div>
		<div class="order-card__body">
			<div class="work row align-items-center">
				<div class="col-md-5">
					<nuxt-link
						:to="localePath({ name: 'store-product', params: { slug: order.products[0].link } })"
						tag="a"
						class="work__picture"
					>
						<span v-if="productCount > 1" class="work__count">+ {{ productCount - 1 }}</span>
						<img :src="order.products[0].picture" :alt="order.products[0].name" />
					</nuxt-link>
				</div>
				<div class="col">
					<div class="work__content">
						<div class="work__artist">{{ order.products[0].artist }}</div>
						<div class="work__name">{{ order.products[0].name }}</div>
						<div class="work__description">{{ order.products[0].description }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerOrderCard',
	props: {
		order: {
			type: Object,
			required: true
		}
	},
	computed: {
		status() {
			return this.$t('customer.orders.statusValues.' + this.order.status)
		},
		productCount() {
			return this.order.products.length
		}
	}
}
</script>

<style lang="scss" scoped>
.order-card {
	&__header {
		margin-bottom: px2rem(48);
		border-bottom: 1px solid $graylighten;
		padding-bottom: px2rem(26);

		.info {
			&__title {
				margin-bottom: 1px;
				font-size: px2rem(18);
				line-height: px2rem(26);
			}

			&__text {
				font-size: px2rem(16);
				line-height: px2rem(24);
				color: $dark-gray;
			}
		}
	}

	&__body {
		.work {
			&__picture {
				position: relative;
				display: block;
				width: 100%;
				height: px2rem(200);

				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}

			&__count {
				position: absolute;
				bottom: 0;
				right: 0;
				padding: 5px;
				background-color: rgba($darklighten, 0.5);
				color: $enlighten;
				font-size: px2rem(14);
				line-height: 1;
			}

			&__content {
				display: flex;
				flex-direction: column;
				gap: px2rem(16);
			}

			&__artist {
				font-size: px2rem(18);
				line-height: px2rem(26);
			}

			&__name {
				font-size: px2rem(16);
				line-height: px2rem(24);
				color: $dark-gray;
			}

			&__description {
				font-size: px2rem(14);
				line-height: px2rem(20);
				color: $dark-gray;
			}
		}
	}
}
</style>

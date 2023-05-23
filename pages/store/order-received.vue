<template>
	<div class="order-received container">
		<div class="order-received__header">
			<PageHeadline variant="customer" position="center" :bordered="false">{{ title }}</PageHeadline>
			<div class="order-received__icon" :class="[`--${order.paymentStatus}`]">
				<SuccessIcon v-if="order.paymentStatus !== 'failure'" width="325" height="325" />
				<FailureIcon v-else width="325" height="325" />
			</div>
		</div>
		<div class="order-received__body">
			<div class="row justify-content-center">
				<div class="col-md-10">
					<p class="order-received__text" v-html="text" />
				</div>
			</div>
			<div v-if="order.paymentStatus !== 'failure'" class="order-received__products">
				<CartProducts :products="order.cartDetails.products" :quantity-changeable="false" />
			</div>
		</div>
		<div v-if="order.paymentStatus !== 'failure' && isCustomer" class="order-received__footer row justify-content-end">
			<div class="col-md-4">
				<nuxt-link :to="localePath({ name: 'store-customer' })" class="btn --primary --large --block">{{
					$t('orderReceived.reviewOrder')
				}}</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
import SuccessIcon from '@/assets/svg/verify.svg'
import FailureIcon from '@/assets/svg/failure.svg'

export default {
	name: 'PaymentSuccess',
	layout: 'StoreLayout',
	components: {
		SuccessIcon,
		FailureIcon
	},
	async asyncData({ $api, redirect }) {
		const { data: order } = await $api.get('/orders/get-my-order').catch((e) => {
			console.log(e)
			// redirect('/')
		})

		return {
			order
		}
	},
	computed: {
		isCustomer() {
			return this.$store.getters.getIsAuthenticated
		},
		title() {
			return this.$t('orderReceived["' + this.order.paymentStatus + '"].title')
		},
		text() {
			return this.$t('orderReceived["' + this.order.paymentStatus + '"].text')
		}
	}
}
</script>

<style lang="scss" scoped>
.order-received {
	&__icon {
		margin-top: px2rem(88);
		text-align: center;

		&.--success,
		&.--waiting {
			color: $success;
		}

		&.--failure {
			color: $alizarin;
		}
	}

	&__body {
		margin-top: px2rem(130);
	}

	&__text {
		line-height: px2rem(24);
	}

	&__products {
		margin-top: px2rem(52);
	}

	&__footer {
		margin-top: px2rem(82);
	}
}
</style>

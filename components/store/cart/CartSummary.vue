<template>
	<div class="cart-summary">
		<template v-if="isCheckoutPage">
			<div class="cart-summary__row">
				<span class="cart-summary__label">{{ $t('cartSummary.shippingPrice') }}</span>
				<span class="cart-summary__value">{{ summary.totalShippingAmount | currency }}</span>
			</div>
			<div class="cart-summary__row">
				<span class="cart-summary__label">{{ $t('cartSummary.taxation') }}</span>
				<span class="cart-summary__value">{{ summary.totalVatAmount | currency }}</span>
			</div>
		</template>
		<div v-if="isCheckoutPage" class="cart-summary__row">
			<span class="cart-summary__label">{{ $t('cartSummary.totalPayment') }}</span>
			<span class="cart-summary__value">{{ summary.totalPayableAmount | currency }}</span>
		</div>
		<div v-else class="cart-summary__row">
			<span class="cart-summary__label">{{ $t('cartSummary.totalPayment') }}</span>
			<span class="cart-summary__value"
				>{{ whichPrice(summary.totalDiscountedAmount, summary.totalAmount) | currency }} + {{ $t('vat') }}</span
			>
		</div>
		<div class="cart-summary__button-area">
			<slot name="button" />
		</div>
		<div v-if="!isCheckoutPage" class="cart-summary__info">{{ $t('cartPage.summaryInfo') }}</div>
	</div>
</template>

<script>
import helpersMixin from '@/mixins/helpers'

export default {
	name: 'CartSummary',
	mixins: [helpersMixin],
	computed: {
		summary() {
			return this.$store.getters.getCartSummary
		},
		isCheckoutPage() {
			return this.$route.name.includes('checkout')
		}
	}
}
</script>

<style lang="scss" scoped>
.cart-summary {
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	&__row {
		margin-bottom: px2rem(30);
		display: inline-flex;
		flex-direction: column;
		align-items: flex-end;
		gap: px2rem(16);
	}

	&__label {
		line-height: px2rem(24);
	}

	&__value {
		font-size: px2rem(24);
		line-height: px2rem(36);
		font-weight: 500;
	}

	&__button-area {
		margin-top: px2rem(12);
		min-width: px2rem(330);
	}

	&__info {
		margin-top: px2rem(42);
		line-height: px2rem(24);
		color: $mild-gray;
	}
}
</style>

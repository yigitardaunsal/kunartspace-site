<template>
	<div class="cart-summary">
		<div class="cart-summary__row">
			<span class="cart-summary__label">{{ $t('cartSummary.totalPayment') }}</span>
			<span class="cart-summary__value">{{ summary.totalPayableAmount | currency }}</span>
		</div>
		<div class="cart-summary__button-area">
			<slot name="button" />
		</div>
		<div class="cart-summary__info">{{ $t('cartPage.summaryInfo') }}</div>
	</div>
</template>

<script>
export default {
	name: 'CartSummary',
	computed: {
		summary() {
			return this.$store.getters.getCartSummary
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

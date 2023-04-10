<template>
	<div class="empty">
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

<script>
import BasketIcon from '@/assets/svg/basket.svg'

export default {
	name: 'EmptyCart',
	components: {
		BasketIcon
	}
}
</script>

<style lang="scss" scoped>
.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: px2rem(20);
	margin-top: px2rem(-45);
}
</style>

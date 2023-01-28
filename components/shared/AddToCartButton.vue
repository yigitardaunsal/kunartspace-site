<template>
	<Button variant="cart">
		<span class="icon">
			<BasketIcon width="25" height="25" />
		</span>
		{{ $t('addToCart') }}
	</Button>
</template>

<script>
import BasketIcon from '@/assets/svg/basket.svg'

export default {
	name: 'AddToCartButton',
	components: {
		BasketIcon
	}
}
</script>

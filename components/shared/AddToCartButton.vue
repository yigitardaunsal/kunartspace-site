<template>
	<Button variant="cart" v-bind="$attrs" @click="$emit('click')">
		<span class="icon">
			<BasketIcon width="25" height="25" />
		</span>
		{{ $t('addToCart') }}
	</Button>
</template>

<script>
import BasketIcon from '@/assets/svg/cart.svg'

export default {
	name: 'AddToCartButton',
	components: {
		BasketIcon
	}
}
</script>

<template>
	<div class="mini-basket">
		<span class="mini-basket__text --empty">{{ $t('miniBasket.noItem') }}</span>
	</div>
</template>

<script>
export default {
	name: 'TheMiniBasket'
}
</script>

<style lang="scss" scoped>
.mini-basket {
	position: absolute;
	top: calc(100% + px2rem(30));
	right: px2rem(-115);
	border-radius: px2rem(10);
	width: px2rem(366);
	padding: px2rem(34) px2rem(20) px2rem(18);
	background-color: $f3-light-gray;

	&__text {
		display: block;
		font-size: px2rem(14);
		line-height: px2rem(21);
		text-align: center;
		color: $dark-gray;

		&.--empty {
			margin-bottom: px2rem(16);
		}
	}
}
</style>

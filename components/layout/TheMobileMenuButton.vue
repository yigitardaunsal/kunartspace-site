<template>
	<button class="mobile-menu-button">
		<MenuSvg width="30" @click="handleClick" />
	</button>
</template>

<script>
import MenuSvg from '@/assets/svg/hamburger.svg'

export default {
	name: 'TheMobileMenuButton',
	components: {
		MenuSvg
	},
	methods: {
		handleClick() {
			this.$store.commit('SET_IS_OPEN_MOBILE_MENU', true)
		}
	}
}
</script>

<style lang="scss" scoped>
.mobile-menu-button {
	display: block;
	margin-left: pxToRem(10);
	min-width: pxToRem(40);
	height: pxToRem(40);
	border: none;
	padding: 0;
	background-color: $enlighten;
	color: $darklighten;

	@include respond-to('x-large') {
		display: none;
	}
}
</style>

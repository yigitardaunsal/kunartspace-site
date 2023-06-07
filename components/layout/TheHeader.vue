<template>
	<header ref="header" class="header container-xxxl">
		<nuxt-link :to="localePath('index')" tag="a" class="logo">
			<Logo />
		</nuxt-link>
		<div class="navigation">
			<slot name="nav" />
		</div>
		<slot name="account" />
		<div class="languages">
			<TheLanguages :right-gap="!!$slots.social" />
		</div>
		<div class="social">
			<slot name="social" />
		</div>
	</header>
</template>

<script>
import Logo from '@/assets/svg/logo.svg'

export default {
	name: 'TheHeader',
	components: {
		Logo
	}
}
</script>

<style lang="scss" scoped>
.header {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	margin: 0 auto;
	height: pxToRem(100);
	gap: pxToRem(30);

	@include respond-to('x-large') {
		height: pxToRem(158);
		gap: 0;
	}

	.logo {
		width: 100%;
		color: $darklighten;

		svg {
			width: 100%;
		}

		@include respond-to('x-large') {
			width: pxToRem(350);
		}
	}

	.navigation {
		display: none;

		@include respond-to('x-large') {
			display: block;
			flex: 1;
		}
	}

	.languages {
		display: none;

		@include respond-to('x-large') {
			display: flex;
		}
	}

	.social {
		display: none;

		@include respond-to('x-large') {
			display: block;
		}
	}
}
</style>

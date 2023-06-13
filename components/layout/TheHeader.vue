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
		<template v-if="$route.path.includes('magaza') || $route.path.includes('store')">
			<button class="mobile-button" @click="openSearchModal">
				<SearchIcon width="25" height="25" />
			</button>
			<nuxt-link :to="localePath({ name: 'store-cart' })" class="mobile-button">
				<BasketIcon width="25" height="25" />
			</nuxt-link>
		</template>
		<TheMobileMenuButton />
	</header>
</template>

<script>
import Logo from '@/assets/svg/logo.svg'
import SearchIcon from '@/assets/svg/search.svg'
import BasketIcon from '@/assets/svg/cart.svg'

export default {
	name: 'TheHeader',
	components: {
		Logo,
		SearchIcon,
		BasketIcon
	},
	methods: {
		openSearchModal() {
			this.$store.commit('SET_IS_OPEN_SEARCH_MODAL', true)
		}
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

	@include respond-to('x-large') {
		height: pxToRem(158);
	}

	.logo {
		margin-right: pxToRem(20);
		width: 100%;
		color: $darklighten;

		svg {
			width: 100%;
		}

		@include respond-to('x-large') {
			margin-right: 0;
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

	.mobile-button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		min-width: pxToRem(40);
		height: pxToRem(40);
		padding: 0;
		background-color: transparent;
		color: $darklighten;

		@include respond-to('x-large') {
			display: none;
		}
	}
}
</style>

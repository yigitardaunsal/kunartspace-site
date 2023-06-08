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
		<button
			v-if="$route.path.includes('magaza') || $route.path.includes('store')"
			class="search"
			@click="openSearchModal"
		>
			<SearchIcon width="25" height="25" />
		</button>
		<TheMobileMenuButton />
	</header>
</template>

<script>
import Logo from '@/assets/svg/logo.svg'
import SearchIcon from '@/assets/svg/search.svg'

export default {
	name: 'TheHeader',
	components: {
		Logo,
		SearchIcon
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

	.search {
		display: block;
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

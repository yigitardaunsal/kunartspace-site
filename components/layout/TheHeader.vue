<template>
	<header ref="header" class="header container-xxxl">
		<nuxt-link :to="localePath('index')" tag="a" class="logo">
			<Logo />
		</nuxt-link>
		<div class="navigation">
			<slot name="nav" />
		</div>
		<slot name="account" />
		<div class="language" :class="{ last: !$slots.social }">
			<button
				v-for="(locale, index) in locales"
				:key="index"
				type="button"
				class="language__item"
				:class="{ active: currentLocale === locale }"
				@click="changeLocale(locale)"
			>
				{{ locale.toLocaleUpperCase() }}
			</button>
		</div>
		<div class="social">
			<slot name="social" />
		</div>
		<TheMobileMenuButton />
	</header>
</template>

<script>
import Logo from '@/assets/svg/logo.svg'

export default {
	name: 'TheHeader',
	components: {
		Logo
	},
	computed: {
		currentLocale() {
			return this.$i18n.locale
		},
		locales() {
			return this.$i18n.localeCodes
		}
	},
	methods: {
		changeLocale(localeCode) {
			this.$i18n.setLocale(localeCode)
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

	.language {
		display: none;

		@include respond-to('x-large') {
			display: flex;
			margin-right: pxToRem(50);

			&.last {
				margin-right: 0;
			}

			&__item {
				border: none;
				width: 30px;
				line-height: 16px;
				background: transparent;
				font-size: pxToRem(12);
				color: $mild-gray;
				cursor: pointer;

				&.active {
					font-weight: 600;
					color: $darklighten;
				}
			}
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

<template>
	<header class="header">
		<nuxt-link :to="localePath('index')" tag="a" class="logo">
			<Logo height="30" />
		</nuxt-link>
		<slot name="nav" />
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
		<slot name="social" />
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
	display: flex;
	align-items: center;
	margin: 0 auto;
	@include respond-to('large') {
		max-width: 1810px;
		padding: px2rem(62) px2rem(12);
	}

	.logo {
		color: $darklighten;
	}

	.language {
		display: flex;
		margin-right: px2rem(50);

		&.last {
			margin-right: 0;
		}

		&__item {
			border: none;
			width: 30px;
			line-height: 16px;
			background: transparent;
			font-size: px2rem(12);
			color: $mild-gray;
			cursor: pointer;

			&.active {
				font-weight: 600;
				color: $darklighten;
			}
		}
	}
}
</style>

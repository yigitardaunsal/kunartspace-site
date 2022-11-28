<template>
	<nav class="nav">
		<nuxt-link :to="localePath('exhibitions')" tag="a" class="nav__item">{{ $t('nav.exhibitions') }}</nuxt-link>
		<nuxt-link to="/" tag="a" class="nav__item">{{ $t('nav.artists') }}</nuxt-link>
		<nuxt-link to="/" tag="a" class="nav__item">{{ $t('nav.about') }}</nuxt-link>
		<nuxt-link to="/" tag="a" class="nav__item">{{ $t('nav.contact') }}</nuxt-link>
		<nuxt-link to="/" tag="a" class="nav__item">{{ $t('nav.store') }}</nuxt-link>
	</nav>
</template>

<script>
export default {
	name: 'TheSiteNav'
}
</script>

<style lang="scss" scoped>
.nav {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	margin: 0 px2rem(50);

	&__item {
		margin-right: px2rem(45);
		font-size: px2rem(18);
		line-height: px2rem(26);
		color: $darklighten;

		&:last-child {
			margin-right: 0;
			font-weight: 600;
		}

		&:hover {
			color: $mild-gray;
		}
	}
}
</style>

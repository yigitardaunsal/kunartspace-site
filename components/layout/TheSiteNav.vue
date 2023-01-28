<template>
	<nav class="nav">
		<nuxt-link :to="localePath('exhibitions')" tag="a" class="nav__item">{{ $t('nav.exhibitions') }}</nuxt-link>
		<nuxt-link :to="localePath('artists')" tag="a" class="nav__item">{{ $t('nav.artists') }}</nuxt-link>
		<nuxt-link
			:to="localePath({ name: 'constant', params: { slug: $t('constantPageLinks.about') } })"
			tag="a"
			class="nav__item"
			>{{ $t('nav.about') }}</nuxt-link
		>
		<nuxt-link :to="localePath('contact')" tag="a" class="nav__item">{{ $t('nav.contact') }}</nuxt-link>
		<nuxt-link :to="localePath('store')" tag="a" class="nav__item">{{ $t('nav.store') }}</nuxt-link>
	</nav>
</template>

<script>
export default {
	name: 'TheSiteNav'
}
</script>

<style lang="scss" scoped>
@include nav(flex-end);
</style>

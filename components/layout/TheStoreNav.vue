<template>
	<nav class="nav">
		<nuxt-link :to="localePath('store')" tag="a" class="nav__item">{{ $t('nav.store') }}</nuxt-link>
		<nuxt-link :to="localePath({ name: 'store-products' })" tag="a" class="nav__item">{{
			$t('nav.products')
		}}</nuxt-link>
		<nuxt-link :to="localePath('exhibitions')" tag="a" class="nav__item">{{ $t('nav.exhibitions') }}</nuxt-link>
		<nuxt-link :to="localePath('artists')" tag="a" class="nav__item">{{ $t('nav.artists') }}</nuxt-link>
		<nuxt-link :to="localePath({ name: 'store-ateliers' })" tag="a" class="nav__item">{{
			$t('nav.atelier')
		}}</nuxt-link>
		<nuxt-link :to="localePath('contact')" tag="a" class="nav__item">{{ $t('nav.contact') }}</nuxt-link>
	</nav>
</template>

<script>
export default {
	name: 'TheStoreNav'
}
</script>

<style lang="scss" scoped>
@include nav(center);
</style>

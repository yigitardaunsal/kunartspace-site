<template>
	<nav class="nav">
		<nuxt-link :to="localePath('exhibitions')" tag="a" class="nav__item">{{ $t('exhibitions') }}</nuxt-link>
		<nuxt-link to="sanatcilar" tag="a" class="nav__item">Sanatçılar</nuxt-link>
		<nuxt-link to="hakkimizda" tag="a" class="nav__item">Hakkımızda</nuxt-link>
		<nuxt-link to="contact" tag="a" class="nav__item">İletişim</nuxt-link>
		<nuxt-link to="magaza" tag="a" class="nav__item">Mağaza</nuxt-link>
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

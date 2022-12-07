<template>
	<nuxt-link :to="localePath({ name: 'artist', params: { slug: artist.link } })" tag="a" class="artist">
		<img :src="artist.image" :alt="artist.name" class="artist__picture" />
		<span class="artist__name">{{ artist.name }}</span>
	</nuxt-link>
</template>

<script>
export default {
	name: 'ArtistCard',
	props: {
		artist: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.artist {
	display: flex;
	align-items: center;
	gap: px2rem(22);
	margin-bottom: px2rem(25);
	color: $dark-gray;

	&:hover {
		color: initial;
	}

	&__picture {
		flex-shrink: 0;
		width: px2rem(154);
		height: px2rem(150);
		object-fit: cover;
	}

	&__name {
		font-size: px2rem(18);
	}
}
</style>

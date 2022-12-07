<template>
	<nuxt-link
		:to="localePath({ name: 'artist', params: { slug: artist.link } })"
		tag="a"
		class="artist"
		:class="{ '--vertical': vertical }"
	>
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
		},
		vertical: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
.artist {
	$self: &;
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

	&.--vertical {
		flex-direction: column;
		align-items: flex-start;
		gap: px2rem(30);
		margin-bottom: px2rem(30);

		#{$self} {
			&__picture {
				width: 100%;
				height: px2rem(400);
			}

			&__name {
				line-height: px2rem(36);
				font-size: px2rem(24);
				color: $darklighten;
			}
		}
	}
}
</style>

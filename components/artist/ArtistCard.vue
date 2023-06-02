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
	gap: pxToRem(22);
	margin-bottom: pxToRem(25);
	color: $dark-gray;

	&:hover {
		color: initial;
	}

	&__picture {
		flex-shrink: 0;
		width: pxToRem(154);
		height: pxToRem(150);
		object-fit: cover;
	}

	&__name {
		font-size: pxToRem(18);
	}

	&.--vertical {
		flex-direction: column;
		align-items: flex-start;
		gap: pxToRem(30);
		margin-bottom: pxToRem(30);

		#{$self} {
			&__picture {
				width: 100%;
				height: pxToRem(400);
			}

			&__name {
				line-height: pxToRem(36);
				font-size: pxToRem(24);
				color: $darklighten;
			}
		}
	}
}
</style>

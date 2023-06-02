<template>
	<div class="selected-artist">
		<div v-for="(artist, index) in artists" :key="index" class="artist">
			<div class="artist__header">
				<h4 class="artist__name">{{ artist.name }}</h4>
				<nuxt-link
					tag="a"
					:to="localePath({ name: 'artist', params: { slug: artist.link } })"
					class="btn --sm --secondary"
					>{{ $t('viewAll') }}</nuxt-link
				>
			</div>
			<div class="artist__works row">
				<div v-for="(work, workIndex) in artist.works" :key="workIndex" class="col-md-4">
					<nuxt-link tag="a" :to="localePath({ name: 'store-product', params: { slug: work.link } })" class="work">
						<div class="work__picture">
							<img :src="work.picture" alt="work name" />
						</div>
						<h5 class="work__name">{{ work.name }}</h5>
						<p class="work__description">{{ work.description }}</p>
						<span class="work__price">{{ work.price | currency }}</span>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SelectedArtists',
	props: {
		artists: {
			type: Array,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.artist {
	margin-bottom: pxToRem(70);

	&:last-child {
		margin-bottom: 0;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: pxToRem(68);
	}

	&__name {
		margin-bottom: 0;
		font-size: pxToRem(30);
		line-height: pxToRem(45);
		font-weight: 500;
	}
}

.work {
	$self: &;
	&__picture {
		width: 100%;
		height: pxToRem(337);
		margin-bottom: pxToRem(50);

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			vertical-align: middle;
		}
	}

	&__name {
		transition: 250ms all;
		margin-bottom: pxToRem(12);
		font-size: pxToRem(20);
		line-height: pxToRem(26);
		font-weight: 400;
		color: $darklighten;
	}

	&__description {
		overflow: hidden;
		margin-bottom: pxToRem(12);
		font-size: pxToRem(14);
		line-height: pxToRem(20);
		font-weight: 300;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: $mild-gray;
	}

	&__price {
		font-size: pxToRem(18);
		line-height: pxToRem(26);
		font-weight: 600;
		color: $darklighten;
	}

	&:hover {
		#{$self} {
			&__name {
				color: $mild-gray;
			}
		}
	}
}
</style>

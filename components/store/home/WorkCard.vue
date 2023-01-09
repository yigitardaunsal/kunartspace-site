<template>
	<nuxt-link tag="a" :to="localePath({ name: 'work', params: { slug: work.link } })" class="work" draggable="false">
		<div class="work__picture">
			<img :src="work.picture" :alt="work.name" />
		</div>
		<h5 class="work__artist">{{ work.artist }}</h5>
		<h6 class="work__name">{{ work.name }}</h6>
		<p class="work__description">{{ work.description }}</p>
		<span class="work__price">{{ work.price | currency }}</span>
	</nuxt-link>
</template>

<script>
export default {
	name: 'WorkCard',
	props: {
		work: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.work {
	$self: &;
	display: block;
	border: px2rem(12) solid $enlighten;
	padding: px2rem(44) px2rem(32) px2rem(36);
	background-color: $f3-light-gray;

	&__picture {
		display: block;
		width: 100%;
		height: px2rem(350);

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			vertical-align: middle;
			pointer-events: none;
		}
	}

	&__artist {
		transition: 250ms all;
		margin: px2rem(42) 0 px2rem(6);
		font-size: px2rem(20);
		line-height: px2rem(26);
		font-weight: 600;
		color: $darklighten;
	}

	&__name {
		margin-bottom: px2rem(18);
		font-size: px2rem(16);
		line-height: px2rem(26);
		font-weight: 400;
		color: $mild-gray;
	}

	&__description {
		overflow: hidden;
		margin-bottom: px2rem(5);
		font-size: px2rem(14);
		line-height: px2rem(20);
		font-weight: 300;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: $mild-gray;
	}

	&__price {
		font-size: px2rem(18);
		line-height: px2rem(26);
		font-weight: 600;
		color: $darklighten;
	}

	&:hover {
		#{$self} {
			&__artist {
				color: $mild-gray;
			}
		}
	}
}
</style>

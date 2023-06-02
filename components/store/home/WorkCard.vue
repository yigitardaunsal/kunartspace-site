<template>
	<nuxt-link
		:to="localePath({ name: 'store-product', params: { slug: work.link } })"
		tag="a"
		class="work"
		draggable="false"
	>
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
	border: pxToRem(12) solid $enlighten;
	padding: pxToRem(44) pxToRem(32) pxToRem(36);
	background-color: $f3-light-gray;

	&__picture {
		display: block;
		width: 100%;
		height: pxToRem(350);

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
		margin: pxToRem(42) 0 pxToRem(6);
		font-size: pxToRem(20);
		line-height: pxToRem(26);
		font-weight: 600;
		color: $darklighten;
	}

	&__name {
		margin-bottom: pxToRem(18);
		font-size: pxToRem(16);
		line-height: pxToRem(26);
		font-weight: 400;
		color: $mild-gray;
	}

	&__description {
		overflow: hidden;
		margin-bottom: pxToRem(5);
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
			&__artist {
				color: $mild-gray;
			}
		}
	}
}
</style>

<template>
	<nuxt-link
		:to="localePath({ name: 'store-product', params: { slug: work.link } })"
		tag="a"
		class="work"
		:class="`--${page}`"
	>
		<div class="work__canvas">
			<img :src="work.image" :alt="work.name" class="work__picture" />
		</div>
		<h6 class="work__name">{{ work.name }}</h6>
		<span v-if="page !== 'exhibition'" class="work__artist">{{ work.artist }}</span>
	</nuxt-link>
</template>

<script>
export default {
	name: 'WorkCard',
	props: {
		work: {
			type: Object,
			required: true
		},
		page: {
			type: String,
			required: false,
			default: 'exhibition'
		}
	}
}
</script>

<style lang="scss" scoped>
.work {
	$self: &;
	display: block;
	margin-bottom: pxToRem(25);

	&__canvas {
		margin-bottom: pxToRem(25);
		width: 100%;
		height: 300px;
	}

	&__picture {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	&__name {
		margin: 0 0 pxToRem(8);
		line-height: pxToRem(32);
		font-size: pxToRem(22);
		font-weight: 400;
	}

	&__artist {
		line-height: pxToRem(32);
		font-size: pxToRem(16);
	}

	&.--artist {
		margin-bottom: pxToRem(68);

		#{$self} {
			&__canvas {
				margin-bottom: pxToRem(28);
			}

			&__name {
				margin: 0;
				font-size: pxToRem(14);
			}
		}
	}
}
</style>

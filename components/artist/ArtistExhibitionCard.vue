<template>
	<nuxt-link :to="localePath({ name: 'exhibition', params: { slug: exhibition.link } })" tag="a" class="exhibition">
		<div class="exhibition__canvas">
			<img :src="exhibition.image" :alt="exhibition.name" class="exhibition__picture" />
		</div>
		<h6 class="exhibition__name">{{ exhibition.name }}</h6>
		<div class="exhibition__date">{{ exhibition.startDate }} - {{ exhibition.endDate }}</div>
		<div class="exhibition__footer">Kun Art Space</div>
	</nuxt-link>
</template>

<script>
export default {
	name: 'ArtistExhibitionCard',
	props: {
		exhibition: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.exhibition {
	margin-bottom: pxToRem(25);
	font-size: pxToRem(14);
	font-weight: 400;

	&__canvas {
		margin-bottom: pxToRem(28);
		height: pxToRem(300);
	}

	&__picture {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__name {
		margin: 0 0 pxToRem(4);
		line-height: pxToRem(33);
		font-size: pxToRem(18);
		font-weight: 500;
	}

	&__date {
		line-height: pxToRem(33);
	}

	&__footer {
		line-height: pxToRem(21);
	}
}
</style>

<template>
	<nuxt-link :to="`/urun/${work.link}`" tag="a" class="work">
		<div class="work__canvas">
			<img :src="work.image" :alt="work.name" class="work__picture" />
		</div>
		<h6 class="work__name">{{ work.name }}</h6>
		<span class="work__artist">{{ work.artist }}</span>
	</nuxt-link>
</template>

<script>
export default {
	name: 'ExhibitionWorkCard',
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
	display: block;
	margin-bottom: px2rem(25);

	&__canvas {
		margin-bottom: px2rem(25);
		width: 100%;
		height: 300px;
	}

	&__picture {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	&__name {
		margin: 0 0 px2rem(8);
		line-height: px2rem(32);
		font-size: px2rem(22);
		font-weight: 400;
	}

	&__artist {
		line-height: px2rem(32);
		font-size: px2rem(16);
	}
}
</style>

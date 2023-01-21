<template>
	<nuxt-link to="#" tag="a" class="work">
		<div class="work__picture">
			<img :src="work.picture" :alt="work.name" />
		</div>
		<h4 class="work__artist">{{ work.artist }}</h4>
		<span class="work__name">{{ work.name }}</span>
		<p class="work__description">{{ work.description }}</p>
		<strong class="work__price">{{ work.price | currency }}</strong>
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
	display: block;
	margin-bottom: px2rem(25);
	border: 1px solid $graylighten;
	border-radius: px2rem(10);
	padding: px2rem(20);

	&__picture {
		margin-bottom: px2rem(16);
		width: 100%;
		height: px2rem(200);

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	&__artist {
		margin-bottom: px2rem(6);
		font-size: px2rem(20);
		line-height: px2rem(26);
		font-weight: 600;
		color: $darklighten;
	}

	&__name {
		display: block;
		margin-bottom: px2rem(11);
		line-height: px2rem(24);
		color: $mild-gray;
	}

	&__description {
		margin-bottom: px2rem(3);
		font-size: px2rem(14);
		line-height: px2rem(21);
		font-weight: 300;
		color: $mild-gray;
	}

	&__price {
		font-size: px2rem(18);
		line-height: px2rem(26);
		font-weight: 600;
		color: $darklighten;
	}
}
</style>

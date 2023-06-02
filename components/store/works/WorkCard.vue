<template>
	<nuxt-link
		:to="localePath({ name: 'store-product', params: { slug: work.link } })"
		tag="a"
		class="work"
		:class="{ [`--${size}`]: !!size }"
	>
		<div class="work__wrapper">
			<div class="work__picture">
				<img :src="work.picture" :alt="work.name" />
			</div>
			<h4 class="work__artist">{{ work.artist }}</h4>
			<span class="work__name">{{ work.name }}</span>
			<p class="work__description">{{ work.description }}</p>
			<strong class="work__price">{{ work.price | currency }}</strong>
		</div>
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
		size: {
			type: String,
			required: false,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.work {
	$self: &;
	display: block;
	height: 100%;
	padding-bottom: pxToRem(25);

	&__wrapper {
		display: flex;
		flex-direction: column;
		transition: 250ms all;
		height: 100%;
		border: 1px solid $graylighten;
		border-radius: pxToRem(10);
		padding: pxToRem(20);
	}

	&__picture {
		margin-bottom: pxToRem(16);
		width: 100%;
		height: pxToRem(200);

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	&__artist {
		margin-bottom: pxToRem(6);
		font-size: pxToRem(20);
		line-height: pxToRem(26);
		font-weight: 600;
		color: $darklighten;
	}

	&__name {
		display: block;
		margin-bottom: pxToRem(11);
		line-height: pxToRem(24);
		color: $mild-gray;
	}

	&__description {
		display: -webkit-box;
		overflow: hidden;
		margin-bottom: pxToRem(3);
		font-size: pxToRem(14);
		line-height: pxToRem(21);
		font-weight: 300;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		color: $mild-gray;
	}

	&__price {
		margin-top: auto;
		font-size: pxToRem(18);
		line-height: pxToRem(26);
		font-weight: 600;
		color: $darklighten;
	}

	&.--lg {
		#{$self} {
			&__wrapper {
				padding: pxToRem(15) pxToRem(20) pxToRem(35);
			}

			&__picture {
				height: pxToRem(483);
			}
		}
	}

	&:hover {
		#{$self} {
			&__wrapper {
				border-color: $darklighten;
			}
		}
	}
}
</style>

<template>
	<client-only>
		<div class="hero">
			<VueSlickCarousel ref="heroSlider" v-bind="settings">
				<div v-for="(exhibition, index) in exhibitionList" :key="index" class="hero__item">
					<nuxt-link :to="localePath({ name: 'exhibition', params: { slug: exhibition.link } })" class="exhibition">
						<div class="exhibition__picture">
							<img :src="exhibition.image" :alt="exhibition.name" />
						</div>
						<div class="exhibition__content">
							<h1 class="exhibition__title">
								{{ exhibition.name
								}}<template v-if="exhibition.artist"
									>, <span>{{ exhibition.artist }}</span></template
								>
							</h1>
							<span class="exhibition__date">{{ exhibition.startDate }} - {{ exhibition.endDate }}</span>
							<p class="exhibition__text">{{ exhibition.description }}</p>
						</div>
					</nuxt-link>
				</div>
			</VueSlickCarousel>
			<div v-if="exhibitionList.length" class="hero__nav">
				<button type="button" class="hero__nav-button --prev" @click="prevSlide">
					<ArrowLeftSvg width="40" />
				</button>
				<button type="button" class="hero__nav-button --next" @click="nextSlide">
					<ArrowRightSvg width="40" />
				</button>
			</div>
		</div>
	</client-only>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import ArrowLeftSvg from '@/assets/svg/angle-arrow-left.svg'
import ArrowRightSvg from '@/assets/svg/angle-arrow-right.svg'

export default {
	name: 'IndexPage',
	components: {
		ArrowLeftSvg,
		ArrowRightSvg
	},
	layout: 'Footerless',
	async asyncData({ store }) {
		await store.dispatch('fetchExhibitionList')
	},
	data() {
		return {
			settings: {
				arrows: false,
				dots: false,
				autoplay: true,
				autoplaySpeed: 3000
			}
		}
	},
	computed: {
		exhibitionList() {
			return this.$store.state.exhibitionList
		}
	},
	methods: {
		prevSlide() {
			this.$refs.heroSlider.prev()
		},
		nextSlide() {
			this.$refs.heroSlider.next()
		}
	}
}
</script>

<style lang="scss" scoped>
.hero {
	position: relative;
	margin: 0 auto;

	@include respond-to('large') {
		max-width: 1780px;
		padding: 12vh pxToRem(12) pxToRem(62);
	}

	&__item {
		.exhibition {
			display: flex;
			flex-direction: column;
			height: calc(100vh - pxToRem(100));
			padding: 0 pxToRem(12);
			color: $darklighten;
			user-drag: none;
			-webkit-user-drag: none;
			user-select: none;
			-moz-user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;

			&__picture {
				flex-shrink: 0;
				margin-right: 0;
				width: 100%;
				height: 50%;

				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
					pointer-events: none;
				}
			}

			&__content {
				display: flex;
				flex-direction: column;
				height: 50%;
			}

			&__title {
				margin: 0 0 pxToRem(24);
				line-height: pxToRem(54);
				font-size: pxToRem(36);
				font-weight: 600;

				span {
					font-weight: 400;
				}
			}

			&__date {
				line-height: pxToRem(30);
				font-size: pxToRem(20);
				color: $dark-gray;
			}

			&__text {
				display: none;
			}

			@include respond-to('large') {
				flex-direction: row;
				height: 100%;
				padding: 0;

				&__picture {
					margin-right: 6%;
					width: 50%;
					height: calc(100vh - 12vh - pxToRem(62) - 158px);
				}

				&__content {
					height: auto;
				}

				&__text {
					display: block;
					margin: auto 0 0;
					max-width: pxToRem(420);
					line-height: pxToRem(22);
					font-size: pxToRem(14);
					color: $dark-gray;
				}
			}
		}
	}

	&__nav {
		position: absolute;
		bottom: pxToRem(20);
		left: 50%;
		transform: translateX(-50%);
		display: grid;
		grid-template-columns: repeat(2, pxToRem(40));
		column-gap: pxToRem(15);

		&-button {
			border: none;
			height: pxToRem(40);
			background-color: transparent;
			color: $dark-gray;

			&:hover {
				color: $darklighten;
			}
		}

		@include respond-to('large') {
			bottom: pxToRem(62);
			left: unset;
			right: pxToRem(12);
			transform: translateX(0);
		}
	}
}
</style>

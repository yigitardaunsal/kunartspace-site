<template>
	<client-only>
		<div class="hero">
			<VueSlickCarousel ref="heroSlider" :arrows="false" :dots="false">
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
		padding: 12vh px2rem(12) px2rem(62);
	}

	&__item {
		.exhibition {
			display: flex;
			height: 100%;
			color: $darklighten;

			&__picture {
				flex-shrink: 0;
				margin-right: 6%;
				width: 50%;
				height: calc(100vh - 12vh - px2rem(62) - 158px);

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
			}

			&__title {
				margin: 0 0 px2rem(24);
				line-height: px2rem(54);
				font-size: px2rem(36);
				font-weight: 600;

				span {
					font-weight: 400;
				}
			}

			&__date {
				line-height: px2rem(30);
				font-size: px2rem(20);
				color: $dark-gray;
			}

			&__text {
				margin: auto 0 0;
				max-width: px2rem(420);
				line-height: px2rem(22);
				font-size: px2rem(14);
				color: $dark-gray;
			}
		}
	}

	&__nav {
		position: absolute;
		bottom: px2rem(62);
		right: px2rem(12);
		display: grid;
		grid-template-columns: repeat(2, px2rem(40));
		column-gap: px2rem(15);

		&-button {
			border: none;
			height: px2rem(40);
			background-color: transparent;
			color: $dark-gray;

			&:hover {
				color: $darklighten;
			}
		}
	}
}
</style>

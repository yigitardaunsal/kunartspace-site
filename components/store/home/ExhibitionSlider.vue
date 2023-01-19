<template>
	<div class="exhibition-slider">
		<client-only>
			<VueSlickCarousel ref="exhibitionSlider" :arrows="false" :dots="false">
				<div v-for="(exhibition, index) in exhibitionList" :key="index" class="exhibition">
					<div class="row">
						<div class="col-md-6">
							<div class="exhibition__picture">
								<img :src="exhibition.image" :alt="exhibition.name" class="img-fluid" />
							</div>
						</div>
						<div class="col-md-5 offset-md-1">
							<div class="exhibition__content">
								<h1 class="exhibition__title">
									{{ exhibition.name
									}}<template v-if="exhibition.artist"
										>, <span>{{ exhibition.artist }}</span></template
									>
								</h1>
								<span class="exhibition__date">{{ exhibition.startDate }} - {{ exhibition.endDate }}</span>
								<nuxt-link
									:to="localePath({ name: 'exhibition', params: { slug: exhibition.link } })"
									class="exhibition__link btn --sm --secondary"
								>
									{{ $t('explore') }}
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</VueSlickCarousel>
			<div v-if="exhibitionList.length" class="exhibition-slider__nav">
				<button type="button" class="exhibition-slider__nav-button --prev" @click="prevSlide">
					<ArrowLeftSvg width="40" />
				</button>
				<button type="button" class="exhibition-slider__nav-button --next" @click="nextSlide">
					<ArrowRightSvg width="40" />
				</button>
			</div>
		</client-only>
	</div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import ArrowLeftSvg from '@/assets/svg/angle-arrow-left.svg'
import ArrowRightSvg from '@/assets/svg/angle-arrow-right.svg'

export default {
	name: 'ExhibitionSlider',
	components: {
		ArrowLeftSvg,
		ArrowRightSvg
	},
	props: {
		exhibitionList: {
			type: Array,
			required: true
		}
	},
	methods: {
		prevSlide() {
			this.$refs.exhibitionSlider.prev()
		},
		nextSlide() {
			this.$refs.exhibitionSlider.next()
		}
	}
}
</script>

<style lang="scss" scoped>
.exhibition-slider {
	position: relative;

	.exhibition {
		&__picture {
			img {
				pointer-events: none;
			}
		}

		&__content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			height: 100%;
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

		&__link {
			margin-top: auto;
		}
	}

	&__nav {
		position: absolute;
		bottom: 0;
		right: px2rem(12);
		display: flex;
		gap: px2rem(25);

		&-button {
			border: none;
			padding: 0;
			background-color: transparent;
			color: $dark-gray;
		}
	}
}
</style>
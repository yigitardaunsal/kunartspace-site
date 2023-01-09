<template>
	<div class="current-works">
		<PageHeadline :bordered="false" position="center">{{ $t('currentWorks') }}</PageHeadline>
		<div class="current-works-slider">
			<client-only>
				<VueSlickCarousel
					ref="currentWorksSlider"
					:slides-to-show="4"
					:arrows="false"
					:dots="false"
					:infinite="true"
					:center-mode="works.length < 4"
				>
					<WorkCard v-for="(work, index) in works" :key="index" :work="work" />
				</VueSlickCarousel>
				<template v-if="works.length > 4">
					<button type="button" class="current-works-slider__nav-button --prev" @click="prevSlide">
						<ArrowLeftSvg width="35" />
					</button>
					<button type="button" class="current-works-slider__nav-button --next" @click="nextSlide">
						<ArrowRightSvg width="35" />
					</button>
				</template>
			</client-only>
		</div>
	</div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import WorkCard from '@/components/store/home/WorkCard.vue'
import ArrowLeftSvg from '@/assets/svg/angle-arrow-left.svg'
import ArrowRightSvg from '@/assets/svg/angle-arrow-right.svg'

export default {
	name: 'CurrentWorks',
	components: {
		WorkCard,
		ArrowLeftSvg,
		ArrowRightSvg
	},
	props: {
		works: {
			type: Array,
			required: true
		}
	},
	methods: {
		prevSlide() {
			this.$refs.currentWorksSlider.prev()
		},
		nextSlide() {
			this.$refs.currentWorksSlider.next()
		}
	}
}
</script>

<style lang="scss" scoped>
.current-works {
	margin: 0 px2rem(-12);

	&-slider {
		position: relative;

		&__nav-button {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			overflow: hidden;
			width: px2rem(50);
			height: px2rem(50);
			border: none;
			border-radius: 50%;
			padding: 0;
			background-color: $enlighten;
			color: $dark-gray;

			&.--prev {
				left: px2rem(25);

				svg {
					margin-left: -2px;
				}
			}

			&.--next {
				right: px2rem(25);

				svg {
					margin-right: -2px;
				}
			}

			&:hover {
				background-color: $dark-gray;
				color: $enlighten;
			}
		}
	}
}
</style>

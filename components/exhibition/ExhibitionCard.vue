<template>
	<div class="exhibition row">
		<div class="col-md-5">
			<nuxt-link
				:to="localePath({ name: 'exhibition', params: { slug: exhibition.link } })"
				tag="a"
				class="exhibition__picture"
			>
				<img :src="exhibition.image" :alt="exhibition.name" class="img-fluid" />
			</nuxt-link>
		</div>
		<div class="col-md-6 offset-md-1">
			<div class="exhibition__content">
				<h1 class="exhibition__title">
					{{ exhibition.name
					}}<template v-if="exhibition.artist"
						>, <span>{{ exhibition.artist }}</span></template
					>
				</h1>
				<span class="exhibition__date">{{ exhibition.startDate }} - {{ exhibition.endDate }}</span>
				<div class="exhibition__footer">
					<p class="exhibition__text">{{ exhibition.description }}...</p>
					<nuxt-link
						:to="localePath({ name: 'exhibition', params: { slug: exhibition.link } })"
						tag="a"
						class="exhibition__link"
					>
						<span>{{ $t('readMore') }}</span> <ArrowRightSvg width="17" />
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ArrowRightSvg from '@/assets/svg/angle-arrow-right.svg'

export default {
	name: 'ExhibitionCard',
	components: {
		ArrowRightSvg
	},
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
	&__content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
	}

	&__title {
		margin: 0 0 pxToRem(12);
		font-size: pxToRem(36);
		font-weight: 600;
		line-height: 1.2;

		span {
			font-weight: 400;
		}
	}

	&__date {
		line-height: pxToRem(22);
	}

	&__footer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		margin: pxToRem(20) 0 0;
		width: 100%;
	}

	&__text {
		margin: 0;
		width: 100%;
		line-height: pxToRem(22);
	}

	&__link {
		display: inline-flex;
		align-items: center;
		gap: pxToRem(5);
		height: pxToRem(22);
	}

	@include respond-to('x-large') {
		&__title {
			line-height: pxToRem(54);
		}

		&__footer {
			flex-direction: row;
			margin: auto 0 0;
		}

		&__text {
			width: pxToRem(420);
		}
	}
}
</style>

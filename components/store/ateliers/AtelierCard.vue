<template>
	<div class="atelier row">
		<div class="col-md-5">
			<nuxt-link
				:to="localePath({ name: 'store-atelier', params: { slug: atelier.link } })"
				tag="a"
				class="atelier__picture"
			>
				<img :src="atelier.image" :alt="atelier.name" class="img-fluid" />
			</nuxt-link>
		</div>
		<div class="col-md-6 offset-1">
			<div class="atelier__content">
				<h1 class="atelier__title">
					{{ atelier.title }}
				</h1>
				<div class="atelier__instructor">
					{{ $t('atelierPage.instructor') }} : <strong>{{ atelier.instructor }}</strong>
				</div>
				<div class="atelier__footer">
					<div>
						<div class="atelier__date">{{ atelier.date }}</div>
						<div class="atelier__text">KUN ART SPACE ADANA</div>
					</div>
					<nuxt-link
						:to="localePath({ name: 'store-atelier', params: { slug: atelier.link } })"
						tag="a"
						class="atelier__link btn --secondary --sm"
					>
						<span>{{ $t('view') }}</span> <ArrowRightSvg width="17" />
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AtelierCard',
	props: {
		atelier: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.atelier {
	&__content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
	}

	&__title {
		margin: 0 0 px2rem(16);
		font-size: px2trem(36);
		font-weight: 500;
		line-height: px2rem(54);
	}

	&__instructor {
		font-size: px2rem(20);
		font-weight: 400;
		line-height: px2rem(30);
		color: $mild-gray;

		strong {
			font-weight: 500;
			color: $darklighten;
		}
	}

	&__footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin: auto 0 0;
		width: 100%;
	}

	&__date {
		margin-bottom: px2rem(34);
		line-height: px2rem(22);
		font-weight: 500;
	}

	&__text {
		font-size: px2rem(14);
	}
}
</style>

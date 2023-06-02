<template>
	<div class="atelier container">
		<div class="atelier__header">
			<h1 class="atelier__title">{{ atelier.title }}</h1>
			<span class="atelier__instructor-title">{{ $t('atelierPage.instructor') }} :</span>
			<span class="atelier__date">{{ nearestSessionDate }} - {{ nearestSessionTime }}</span>
			<strong class="atelier__instructor">{{ atelier.instructor }}</strong>
		</div>
		<div class="atelier__content">
			<div class="row">
				<div class="col-md-6">
					<div class="atelier__picture">
						<img :src="atelier.image" :alt="atelier.title" class="img-fluid" />
					</div>
					<div class="atelier__price">
						{{ $t('atelierPage.price') }}: <strong>{{ atelier.price | currency }}</strong>
					</div>
					<div class="atelier__buttons">
						<Button variant="secondary" block>Atölyeye Katıl</Button>
					</div>
				</div>
				<div class="col-md-6">
					<div class="atelier__text" v-html="atelier.description" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AtelierPage',
	layout: 'StoreLayout',
	nuxtI18n: {
		paths: {
			tr: '/magaza/atolye/:slug',
			en: '/store/atelier/:slug'
		}
	},
	async asyncData({ $api, params, $moment, i18n, error }) {
		try {
			const { data: atelier } = await $api.get(`/ateliers/get-detail/${params.slug}`)

			let nearestSession = atelier.sessions[0]

			if (atelier.sessions.length > 1) {
				const foundNearestSession = atelier.sessions.find((session) => new Date(session.date) > new Date())

				if (foundNearestSession) {
					nearestSession = foundNearestSession
				}
			}

			return {
				atelier,
				nearestSessionDate: $moment(nearestSession.date).locale(i18n.locale).format('DD MMMM YYYY'),
				nearestSessionTime: nearestSession.time.replaceAll(' ', '')
			}
		} catch (err) {
			error({ statusCode: err.response.status, message: err.message })
		}
	}
}
</script>

<style lang="scss" scoped>
.atelier {
	&__header {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		align-items: self-end;
		margin-bottom: px2rem(68);
	}

	&__title {
		margin-bottom: px2rem(14);
		font-size: px2rem(58);
		font-weight: 600;
	}

	&__instructor-title {
		margin-bottom: px2rem(14);
		font-size: px2rem(20);
		text-align: right;
		color: $mild-gray;
	}

	&__date {
		font-size: px2rem(20);
	}

	&__instructor {
		font-size: px2rem(24);
		font-weight: 500;
	}

	&__price {
		margin: px2rem(30) 0;
		font-size: px2rem(20);
		color: $mild-gray;

		strong {
			color: $darklighten;
		}
	}

	&__text {
		padding-left: px2rem(26);
		font-size: px2rem(14);
		line-height: px2rem(20);
		color: $dark-gray;
	}
}
</style>

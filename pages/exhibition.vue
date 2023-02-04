<template>
	<div class="exhibition container">
		<div class="exhibition__header">
			<h1 class="exhibition__title">{{ exhibition.title }}</h1>
			<span class="exhibition__date">{{ startDate }} - {{ endDate }}</span>
		</div>
		<div class="exhibition__body row align-items-center">
			<div class="col-md-6">
				<img :src="exhibition.image" :alt="exhibition.title" class="img-fluid" />
			</div>
			<div class="col-md-6">
				<div class="exhibition__content" v-html="exhibition.description" />
			</div>
		</div>
		<div class="exhibition__artists">
			<PageHeadline tag="h2" size="md">{{ $t('artists') }}</PageHeadline>
			<div class="row">
				<div v-for="(artist, index) in exhibition.artists" :key="index" class="col-md-4">
					<ArtistCard :artist="artist" />
				</div>
			</div>
		</div>
		<div class="exhibition__works">
			<PageHeadline tag="h2" size="md">{{ $t('works') }}</PageHeadline>
			<div class="row">
				<div v-for="(work, index) in exhibition.works" :key="index" class="col-md-4">
					<WorkCard :work="work" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ExhibitionPage',
	async asyncData({ i18n, params, $api, store, $moment }) {
		const { data } = await $api.get(`/exhibitions/get-detail/${params.slug}`)
		const dates = data.date.split(' - ')

		await store.dispatch('i18n/setRouteParams', {
			tr: { slug: data.link },
			en: { slug: data.enLink }
		})

		return {
			exhibition: data,
			startDate: $moment(dates[0]).locale(i18n.locale).format('DD MMMM'),
			endDate: $moment(dates[1]).locale(i18n.locale).format('DD MMMM YYYY')
		}
	},
	nuxtI18n: {
		paths: {
			tr: '/sergi/:slug',
			en: '/exhibition/:slug'
		}
	}
}
</script>

<style lang="scss" scoped>
.exhibition {
	&__header {
		margin: px2rem(40) 0 px2rem(72);
	}

	&__title {
		margin: 0;
		line-height: px2rem(84);
		font-size: px2rem(56);
		font-weight: 600;
	}

	&__date {
		display: block;
		line-height: px2rem(28);
		font-size: px2rem(18);
	}

	&__body {
		margin-bottom: px2rem(66);
	}

	&__content {
		padding-left: px2rem(46);
		line-height: px2rem(22);
		font-size: px2rem(14);
		color: $dark-gray;

		p {
			margin-bottom: px2rem(20);
		}
	}

	&__artists {
		margin-bottom: px2rem(25);
	}

	&__works {
		margin-bottom: px2rem(75);
	}
}
</style>

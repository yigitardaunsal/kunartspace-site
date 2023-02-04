<template>
	<div class="artist container">
		<TabContainer>
			<TabPane :title="$t('artistPage.overview')">
				<div class="row align-items-center">
					<div class="col-md-6">
						<img :src="artist.image" :alt="artist.name" class="img-fluid" />
					</div>
					<div class="col-md-5 offset-1">
						<h1 class="artist__name">{{ artist.name }}</h1>
						<div class="artist__bio" v-html="artist.bio" />
					</div>
				</div>
			</TabPane>
			<TabPane :title="$t('artistPage.works')">
				<div class="row">
					<div v-for="(work, index) in artist.works" :key="index" class="col-md-4">
						<WorkCard :work="work" page="artist" />
					</div>
				</div>
			</TabPane>
			<TabPane :title="$t('artistPage.exhibitions')">
				<div class="row">
					<div v-for="(exhibition, index) in exhibitions" :key="index" class="col-md-4">
						<ArtistExhibitionCard :exhibition="exhibition" />
					</div>
				</div>
			</TabPane>
		</TabContainer>
	</div>
</template>

<script>
export default {
	name: 'ArtistPage',
	async asyncData({ store, params, $api, i18n, $moment }) {
		await store.dispatch('i18n/setRouteParams', {})

		const { data } = await $api.get(`/artists/get-detail/${params.slug}`)
		const exhibitions = data.exhibitions.map((exhibition) => {
			const dates = exhibition.date.split(' - ')
			return {
				...exhibition,
				startDate: $moment(dates[0]).locale(i18n.locale).format('DD MMMM'),
				endDate: $moment(dates[1]).locale(i18n.locale).format('DD MMMM YYYY')
			}
		})

		return {
			artist: data,
			exhibitions
		}
	},
	nuxtI18n: {
		paths: {
			tr: '/sanatci/:slug',
			en: '/artist/:slug'
		}
	}
}
</script>

<style lang="scss" scoped>
.artist {
	margin-bottom: px2rem(100);

	&__name {
		margin: 0 0 20%;
		line-height: px2rem(45);
		font-size: px2rem(30);
		font-weight: 500;
	}

	&__bio {
		line-height: px2rem(21);
		font-size: px2rem(14);
		font-weight: 400;
		color: $dark-gray;
	}
}
</style>

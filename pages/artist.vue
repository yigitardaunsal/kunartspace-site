<template>
	<div class="artist container">
		<TabContainer :activeIndex="activeTab">
			<TabPane :title="$t('artistPage.overview')">
				<div class="row">
					<div class="col-md-6">
						<div class="artist__picture">
							<img :src="artist.image" :alt="artist.name" class="img-fluid" />
						</div>
					</div>
					<div class="col-md-5 offset-md-1">
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
	async asyncData({ store, params, query, $api, i18n, $moment }) {
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

		const works = i18n.t('artistPage.works').toLowerCase()

		return {
			activeTab: Object.keys(query).includes(works) ? 1 : 0,
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
	margin-bottom: pxToRem(100);

	&__picture {
		position: sticky;
		top: pxToRem(20);
		margin-bottom: pxToRem(20);
		text-align: center;

		@include respond-to('x-large') {
			margin-bottom: 0;
		}
	}

	&__name {
		margin: 0 0 20%;
		line-height: pxToRem(45);
		font-size: pxToRem(30);
		font-weight: 500;
	}

	&__bio {
		line-height: pxToRem(21);
		font-size: pxToRem(14);
		font-weight: 400;
		color: $dark-gray;
	}
}
</style>

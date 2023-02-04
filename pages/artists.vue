<template>
	<div class="artists container">
		<div class="artists__exhibited">
			<PageHeadline tag="h1">{{ $t('artistPage.exhibitedArtists') }}</PageHeadline>
			<div class="row">
				<div v-for="(artist, index) in exhibitedArtists" :key="index" class="col-md-4">
					<ArtistCard :artist="artist" vertical />
				</div>
			</div>
		</div>
		<div class="artists__list">
			<PageHeadline tag="h2">{{ $t('artists') }}</PageHeadline>
			<div class="row">
				<div v-for="(artist, index) in artists" :key="index" class="col-md-4">
					<ArtistCard :artist="artist" vertical />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ArtistsPage',
	async asyncData({ $api }) {
		const { data } = await $api.get('/artists/get-list')

		return {
			exhibitedArtists: data.filter((artist) => artist.hasExhibition),
			artists: data.filter((artist) => !artist.hasExhibition)
		}
	},
	nuxtI18n: {
		paths: {
			tr: '/sanatcilar',
			en: '/artists'
		}
	}
}
</script>

<style lang="scss" scoped>
.artists {
	&__exhibited {
		margin-bottom: px2rem(22);
	}
}
</style>

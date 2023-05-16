<template>
	<div class="artists container">
		<div class="artists__exhibited">
			<PageHeadline tag="h1">{{ $t('artistPage.exhibitedArtists') }}</PageHeadline>
			<div class="row">
				<div v-for="(artist, index) in sortedExhibitedArtists" :key="index" class="col-md-4">
					<ArtistCard :artist="artist" vertical />
				</div>
			</div>
		</div>
		<div class="artists__list">
			<PageHeadline tag="h2">{{ $t('artists') }}</PageHeadline>
			<div class="row">
				<div v-for="(artist, index) in sortedArtists" :key="index" class="col-md-4">
					<ArtistCard :artist="artist" vertical />
				</div>
			</div>
			<PageHeadline tag="h3">{{ $t('designers') }}</PageHeadline>
			<div class="row">
				<div v-for="(designer, index) in sortedDesigners" :key="index" class="col-md-4">
					<ArtistCard :artist="designer" vertical />
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
			artists: data.filter((artist) => !artist.hasExhibition && artist.type === 'artist'),
			designers: data.filter((designer) => !designer.hasExhibition && designer.type === 'designer')
		}
	},
	nuxtI18n: {
		paths: {
			tr: '/sanatcilar',
			en: '/artists'
		}
	},
	data() {
		return {
			sortingType: 'default'
		}
	},
	computed: {
		sortedExhibitedArtists() {
			const exhibitedArtists = [...this.exhibitedArtists]
			return exhibitedArtists?.sort((a, b) => this.sorting(a, b, this.defaultSorting))
		},
		sortedArtists() {
			const artists = [...this.artists]
			return artists?.sort((a, b) => this.sorting(a, b, this.defaultSorting))
		},
		sortedDesigners() {
			const designers = [...this.designers]
			return designers?.sort((a, b) => this.sorting(a, b, this.defaultSorting))
		}
	},
	methods: {
		sorting(a, b, type = 'default') {
			switch (type) {
				case 'zToA':
					break

				default:
					return this.defaultSorting(a, b)
			}
		},
		defaultSorting(a, b) {
			if (a.name < b.name) {
				return -1
			}
			if (a.name > b.name) {
				return 1
			}
			return 0
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

<template>
	<div class="artists container">
		<div v-if="exhibitedArtists.length" class="artists__exhibited">
			<PageHeadline tag="h1">{{ $t('artistPage.exhibitedArtists') }}</PageHeadline>
			<div class="row">
				<div v-for="(artist, index) in exhibitedArtists" :key="index" class="col-md-4">
					<ArtistCard :artist="artist" vertical />
				</div>
			</div>
		</div>
		<div class="artists__list">
			<PageHeadline tag="div">
				<div class="artist-filter">
					<div class="artist-title">
						{{ $t('artists') }}
					</div>
					<div class="artist-search">
						<input
							type="text"
							class="artist-search__input"
							v-model="searchKey"
							:placeholder="$t('artistPage.searchPlaceholder')"
						/>
						<div class="artist-search__icon">
							<SearchSvg width="30" height="30" />
						</div>
					</div>
					<div class="artist-sort">
						<SortingWidget :items="sortingItems" @on-select-item="handleSortingItemSelect" />
					</div>
				</div>
			</PageHeadline>
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
import SearchSvg from '@/assets/svg/search.svg'
import { artistSortingItems } from '@/constants/sorting'

export default {
	name: 'ArtistsPage',
	components: {
		SearchSvg
	},
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
			searchKey: '',
			sortingType: 'default'
		}
	},
	computed: {
		sortedArtists() {
			const artists = [...this.artists]
			return artists
				?.sort((a, b) => this.sorting(a, b, this.defaultSorting))
				?.filter((artist) => artist.name.toLowerCase().includes(this.searchKey.toLowerCase()))
		},
		sortedDesigners() {
			const designers = [...this.designers]
			return designers
				?.sort((a, b) => this.sorting(a, b, this.defaultSorting))
				?.filter((artist) => artist.name.toLowerCase().includes(this.searchKey.toLowerCase()))
		},
		sortingItems: () => artistSortingItems
	},
	methods: {
		handleSortingItemSelect(val) {
			this.sortingType = val
		},
		sorting(a, b) {
			switch (this.sortingType) {
				case 'z-to-a':
					return -1 * a.name.localeCompare(b.name)

				case 'oldest':
					return new Date(a.createdAt) - new Date(b.createdAt)

				case 'latest':
					return new Date(b.createdAt) - new Date(a.createdAt)

				case 'a-to-z':
				default:
					return a.name.localeCompare(b.name)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.artists {
	&__exhibited {
		margin-bottom: pxToRem(22);
	}

	.artist-filter {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		@include respond-to('x-large') {
			flex-wrap: nowrap;
		}
	}

	.artist-title {
		margin-right: 0;
		width: 100%;

		@include respond-to('x-large') {
			width: auto;
			margin-right: pxToRem(68);
		}
	}

	.artist-search {
		display: flex;
		align-items: center;
		margin-top: pxToRem(10);
		border: 1px solid $mild-gray;
		border-radius: 5px;
		width: 52%;
		padding: 0 20px;

		&__input {
			flex: 1;
			flex-shrink: 0;
			border: none;
			width: 100%;
			height: pxToRem(42);
			padding: 0 10px 0 0;
			font-size: pxToRem(14);
			font-weight: 400;
			color: $mild-gray;

			&:focus {
				outline: none;
			}
		}

		&__icon {
			flex-shrink: 0;
			width: pxToRem(30);
			height: pxToRem(30);
			line-height: 1;
		}

		@include respond-to('x-large') {
			margin-top: 0;
			width: pxToRem(242);
		}
	}

	.artist-sort {
		margin-left: auto;
	}
}
</style>

<template>
	<div class="works container-xxxl">
		<div class="works__header">
			<button
				v-if="filters.length"
				class="works__button --filter"
				:class="{ '--active': isFilterWidgetShowing }"
				@click="showFilterWidget"
			>
				<span class="text">{{ $t('worksPage.filter') }}</span>
				<span class="icon"><FilterIcon width="30" height="30" /></span>
			</button>
			<button class="works__button --sorting" @click="showSortingWidget">
				<span class="text">Sort By</span>
				<span class="icon"><DownArrowIcon width="30" height="30" /></span>
			</button>
		</div>
		<div ref="worksBody" class="works__body">
			<div class="row">
				<div v-for="(work, index) in works" :key="index" class="col-md-3">
					<WorkCard size="lg" :work="work" />
				</div>
			</div>
		</div>
		<div v-if="pageCount > 1" class="works__footer">
			<Pagination :page-count="pageCount" :active-page="activePage" />
		</div>
		<FilterWidget
			v-if="isFilterWidgetShowing"
			:filters="filters"
			:selected-items="selectedFilters"
			@close="closeFilterWidget"
		/>
		<SortingWidget v-if="isSortingWidgetShowing" @close="closeSortingWidget" />
	</div>
</template>

<script>
import FilterIcon from '@/assets/svg/filter.svg'
import DownArrowIcon from '@/assets/svg/arrow-down.svg'
import WorkCard from '@/components/store/works/WorkCard'

export default {
	name: 'WorksPage',
	components: {
		FilterIcon,
		DownArrowIcon,
		WorkCard
	},
	layout: 'StoreLayout',
	nuxtI18n: {
		paths: {
			tr: '/magaza/eserler',
			en: '/store/works'
		}
	},
	async asyncData({ i18n, $axios, query, error }) {
		const params = {
			page: query?.page || 1,
			filters: query?.filters || null,
			sorting: query?.sorting || null
		}

		if (!params.filters) delete params.filters
		if (!params.sorting) delete params.sorting

		try {
			$axios.setHeader('lang', i18n.locale)
			const { data } = await $axios.get('/works/get-list', { params })
			const { data: filters } = await $axios.get('/filters/get-list')

			return {
				works: data.data,
				pageCount: data.metaData.pageCount,
				activePage: data.metaData.pageNumber,
				filters,
				selectedFilters: query?.filters?.split(';') || []
			}
		} catch (err) {
			error({ statusCode: 404, message: err.message })
		}
	},
	data() {
		return {
			isFilterWidgetShowing: false,
			isSortingWidgetShowing: false
		}
	},
	watchQuery: ['page', 'filters', 'sorting'],
	methods: {
		showFilterWidget() {
			document.body.style.overflow = 'hidden'
			this.isFilterWidgetShowing = true
		},
		closeFilterWidget() {
			document.body.style.overflow = 'auto'
			this.isFilterWidgetShowing = false
		},
		showSortingWidget() {
			document.body.style.overflow = 'hidden'
			this.isSortingWidgetShowing = true
		},
		closeSortingWidget() {
			document.body.style.overflow = 'auto'
			this.isSortingWidgetShowing = false
		}
	}
}
</script>

<style lang="scss" scoped>
.works {
	margin: px2rem(50) auto 0;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: px2rem(35);
	}

	&__button {
		display: inline-flex;
		align-items: center;
		background-color: $enlighten;
		color: $mild-gray;

		&.--filter {
			justify-content: space-between;
			border: 1px solid $b-gray;
			border-radius: px2rem(10);
			width: px2rem(368);
			height: px2rem(75);
			padding: 0 px2rem(36);
			font-size: px2rem(22);

			&.--active {
				border-color: $darklighten;
				background-color: $darklighten;
				color: $enlighten;
			}
		}

		&.--sorting {
			gap: px2rem(20);
			margin-left: auto;
			border: none;
			height: px2rem(30);
			font-size: px2rem(22);
		}

		&:not(.--active):hover {
			border-color: $darklighten;
			color: $darklighten;
		}
	}

	&__footer {
		margin-top: px2rem(75);
	}
}
</style>

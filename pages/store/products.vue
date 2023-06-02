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
			<SortingWidget :items="sortingItems" @on-select-item="handleSortingItemSelect" />
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
	</div>
</template>

<script>
import FilterIcon from '@/assets/svg/filter.svg'
import { workSortingItems } from '@/constants/sorting'
import WorkCard from '@/components/store/works/WorkCard'

export default {
	name: 'ProductsPage',
	components: {
		FilterIcon,
		WorkCard
	},
	layout: 'StoreLayout',
	nuxtI18n: {
		paths: {
			tr: '/magaza/urunler',
			en: '/store/products'
		}
	},
	async asyncData({ $api, query, error }) {
		const params = {
			page: query?.page || 1,
			filters: query?.filters || null,
			sorting: query?.sorting || null,
			q: query?.q || null
		}

		Object.keys(params).forEach((key) => {
			if (!params[key]) delete params[key]
		})

		try {
			const { data } = await $api.get('/works/get-list', { params })
			const { data: filters } = await $api.get('/filters/get-list')

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
	computed: {
		sortingItems: () => workSortingItems
	},
	watchQuery: ['page', 'filters', 'sorting', 'q'],
	methods: {
		showFilterWidget() {
			document.body.style.overflow = 'hidden'
			this.isFilterWidgetShowing = true
		},
		closeFilterWidget() {
			document.body.style.overflow = 'auto'
			this.isFilterWidgetShowing = false
		},
		handleSortingItemSelect(val) {
			const query = {
				...this.$route.query,
				sorting: val
			}

			delete query?.page

			this.$router.push({
				name: this.$route.name,
				query
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.works {
	margin: pxToRem(50) auto 0;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: pxToRem(35);
	}

	&__button {
		display: inline-flex;
		align-items: center;
		background-color: $enlighten;
		color: $mild-gray;

		&.--filter {
			justify-content: space-between;
			border: 1px solid $b-gray;
			border-radius: pxToRem(10);
			width: pxToRem(368);
			height: pxToRem(75);
			padding: 0 pxToRem(36);
			font-size: pxToRem(22);

			&.--active {
				border-color: $darklighten;
				background-color: $darklighten;
				color: $enlighten;
			}
		}

		&:not(.--active):hover {
			border-color: $darklighten;
			color: $darklighten;
		}
	}

	&__footer {
		margin-top: pxToRem(75);
	}
}
</style>

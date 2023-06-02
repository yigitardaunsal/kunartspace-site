<template>
	<ul class="pagination">
		<li v-if="activePage !== 1" class="pagination__item">
			<nuxt-link :to="`?page=${activePage - 1}`" tag="a" class="pagination__link">
				<LeftArrowIcon width="30" height="30" />
			</nuxt-link>
		</li>
		<li v-if="pageCount > 4 && activePage > 2" class="pagination__item">
			<nuxt-link to="?page=1" tag="a" class="pagination__link"> 1 </nuxt-link>
		</li>
		<li v-if="pageCount > 4 && activePage > 3" class="pagination__item">...</li>
		<li v-for="page in pages" :key="page" class="pagination__item">
			<nuxt-link :to="`?page=${page}`" tag="a" class="pagination__link">
				{{ page }}
			</nuxt-link>
		</li>
		<li v-if="pageCount > 4 && activePage <= pageCount - 3" class="pagination__item">...</li>
		<li class="pagination__item">
			<nuxt-link :to="`?page=${pageCount}`" tag="a" class="pagination__link">
				{{ pageCount }}
			</nuxt-link>
		</li>
		<li v-if="activePage !== pageCount" class="pagination__item">
			<nuxt-link :to="`?page=${activePage + 1}`" tag="a" class="pagination__link">
				<RightArrowIcon width="30" height="30" />
			</nuxt-link>
		</li>
	</ul>
</template>

<script>
import LeftArrowIcon from '@/assets/svg/arrow-left.svg'
import RightArrowIcon from '@/assets/svg/arrow-right.svg'

export default {
	name: 'AppPagination',
	components: {
		LeftArrowIcon,
		RightArrowIcon
	},
	props: {
		pageCount: {
			type: Number,
			required: true
		},
		activePage: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			pageArr: []
		}
	},
	computed: {
		pages() {
			if (this.pageCount > 4) {
				return this.pageArr.filter((p, i) => {
					const lowerLimit = this.activePage > 2 ? this.activePage - 2 : 0
					const upperLimit = this.activePage === 1 ? 3 : this.activePage + 1
					return i >= lowerLimit && i < upperLimit
				})
			}
			return this.pageArr
		}
	},
	created() {
		for (let i = 1; i < this.pageCount; i++) {
			this.pageArr.push(i)
		}
	},
	methods: {
		changePage(page) {
			this.$emit('on-change-page', page)
		}
	}
}
</script>

<style lang="scss" scoped>
.pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: pxToRem(25);
	list-style: none;
	margin: 0;
	padding: 0;

	&__item {
		font-size: pxToRem(20);
		line-height: pxToRem(30);
		color: $mild-gray;
	}

	&__link {
		color: inherit;

		&:hover,
		&.nuxt-link-exact-active {
			color: $darklighten;
		}
	}
}
</style>

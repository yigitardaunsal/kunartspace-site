<template>
	<div class="sorting-widget">
		<div class="sorting-widget__overlay" @click.self="close"></div>
		<div ref="sortingWidgetWrapper" class="sorting-widget__wrapper">
			<button
				v-for="(item, index) in sortingItems"
				:key="index"
				class="sorting-widget__item"
				@click="handleSelectItem(item.value)"
			>
				{{ $t(`sortingItems.${item.key}`) }}
			</button>
		</div>
	</div>
</template>

<script>
import sorting from '@/constants/sorting'

export default {
	name: 'SortingWidget',
	computed: {
		sortingItems() {
			return sorting
		}
	},
	mounted() {
		const worksBody = this.$parent.$refs.worksBody
		const rect = worksBody.getBoundingClientRect()
		const wrapper = this.$refs.sortingWidgetWrapper
		const top = rect.top - 36
		wrapper.style.left = rect.width - '300' + 'px'
		if (window.innerHeight > wrapper.clientHeight + top) {
			wrapper.style.top = top + 'px'
			return
		}
		wrapper.style.bottom = 0
	},
	methods: {
		close() {
			this.$emit('close')
		},
		handleSelectItem(val) {
			const query = {
				...this.$route.query,
				sorting: val
			}

			delete query?.page

			this.$router.push({
				name: this.$route.name,
				query
			})

			this.close()
		}
	}
}
</script>

<style lang="scss" scoped>
.sorting-widget {
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	&__overlay {
		width: 100%;
		height: 100%;
	}

	&__wrapper {
		position: absolute;
		border-radius: px2rem(10);
		width: px2rem(300);
		padding: px2rem(21) px2rem(24);
		background-color: $f3-light-gray;
	}

	&__item {
		display: block;
		border: none;
		border-bottom: 1px solid $mild-gray;
		width: 100%;
		height: px2rem(56);
		padding: 0 px2rem(10);
		font-size: px2rem(18);
		text-align: left;
		color: $dark-gray;

		&:last-child {
			border-bottom: none;
		}

		&:hover {
			color: $darklighten;
		}
	}
}
</style>

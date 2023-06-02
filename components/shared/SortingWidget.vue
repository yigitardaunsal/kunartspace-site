<template>
	<div class="sorting">
		<button ref="button" class="sorting-button" @click="open">
			<span class="sorting-button__text">{{ $t('sort') }}</span>
			<span class="sorting-button__icon"><DownArrowIcon width="30" height="30" /></span>
		</button>
		<div v-if="isOpen" class="sorting-widget">
			<div class="sorting-widget__overlay" @click.self="close"></div>
			<div ref="wrapper" class="sorting-widget__wrapper">
				<button
					v-for="(item, index) in items"
					:key="index"
					class="sorting-widget__item"
					@click="handleSelectItem(item.value)"
				>
					{{ $t(`sortingItems.${item.key}`) }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import DownArrowIcon from '@/assets/svg/arrow-down.svg'

export default {
	name: 'SortingWidget',
	components: {
		DownArrowIcon
	},
	props: {
		items: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			isOpen: false
		}
	},
	watch: {
		isOpen(val) {
			if (!val) {
				return
			}

			this.$nextTick(() => {
				const buttonRect = this.$refs.button.getBoundingClientRect()
				const top = buttonRect.top
				const wrapper = this.$refs.wrapper
				if (window.innerHeight > wrapper.clientHeight + top) {
					wrapper.style.top = top + 'px'
					return
				}
				wrapper.style.bottom = 0
			})
		}
	},
	methods: {
		open() {
			document.body.style.overflow = 'hidden'
			this.isOpen = true
		},
		close() {
			document.body.style.overflow = 'auto'
			this.isOpen = false
		},
		handleSelectItem(val) {
			this.$emit('on-select-item', val)
			this.close()
		}
	}
}
</script>

<style lang="scss" scoped>
.sorting-button {
	display: inline-flex;
	align-items: center;
	gap: pxToRem(20);
	border: none;
	height: pxToRem(30);
	background-color: $enlighten;
	font-size: pxToRem(22);
	color: $mild-gray;

	&:hover {
		color: $darklighten;
	}
}
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
		right: 0;
		border-radius: pxToRem(10);
		width: pxToRem(300);
		padding: pxToRem(21) pxToRem(24);
		background-color: $f3-light-gray;
	}

	&__item {
		display: block;
		border: none;
		border-bottom: 1px solid $mild-gray;
		width: 100%;
		height: pxToRem(56);
		padding: 0 pxToRem(10);
		font-size: pxToRem(18);
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

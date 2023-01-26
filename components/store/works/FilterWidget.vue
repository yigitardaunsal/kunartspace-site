<template>
	<div class="filter-widget">
		<div class="filter-widget__overlay" @click.self="close"></div>
		<div ref="filterWidgetWrapper" class="filter-widget__wrapper">
			<div class="filter-widget__body">
				<div class="filters">
					<div v-for="(filter, index) in filters" :key="index" class="filter">
						<div class="filter__header">
							<span class="filter__icon">
								<PenaIcon width="32" height="32" />
							</span>
							<span class="filter__title">{{ filter.groupName }}</span>
						</div>
						<div class="filter__body">
							<label v-for="(item, itemIndex) in filter.items" :key="itemIndex" class="filter__item">
								<input v-model="selectedFilters" type="checkbox" :value="item.code" class="input" />
								<span class="square">
									<CheckIcon widht="12" height="12" />
								</span>
								<span class="text">{{ item.name }}</span>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="filter-widget__footer">
				<Button block :disabled="!filters.length" :loading="loading" @click="apply">{{ $t('apply') }}</Button>
			</div>
		</div>
	</div>
</template>

<script>
import PenaIcon from '@/assets/svg/pena.svg'
import CheckIcon from '@/assets/svg/check.svg'

export default {
	name: 'FilterWidget',
	components: {
		PenaIcon,
		CheckIcon
	},
	props: {
		filters: {
			type: Array,
			required: true
		},
		selectedItems: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			selectedFilters: [],
			loading: false
		}
	},
	created() {
		this.selectedFilters = this.selectedItems
	},
	mounted() {
		const worksBody = this.$parent.$refs.worksBody
		const rect = worksBody.getBoundingClientRect()
		const wrapper = this.$refs.filterWidgetWrapper
		wrapper.style.top = rect.top + 'px'
		wrapper.style.height = window.innerHeight - rect.top + 'px'
	},
	methods: {
		close() {
			this.$emit('close')
		},
		apply() {
			const filters = this.selectedFilters.join(';')
			const query = {}

			if (filters) {
				query.filters = filters
			}

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
.filter-widget {
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
		left: 0;
		width: px2rem(600);
		padding: px2rem(35) 0 0;
		background-color: $f3-light-gray;
	}

	&__body {
		height: calc(100% - px2rem(71));
		.filters {
			overflow-y: auto;
			height: 100%;
			padding: 0 px2rem(35);

			.filter {
				margin-bottom: px2rem(20);
				border-bottom: 1px solid $mild-gray;
				padding: 0 px2rem(35) px2rem(35);

				&:last-child {
					margin-bottom: 0;
					border-bottom: none;
				}

				&__header {
					display: flex;
					align-items: center;
					gap: px2rem(10);
					margin-bottom: px2rem(20);
				}

				&__title {
					font-size: px2rem(25);
					line-height: px2rem(38);
					font-weight: 600;
				}

				&__body {
					overflow-y: auto;
					max-height: px2rem(270);

					&::-webkit-scrollbar {
						width: 5px;
					}

					&::-webkit-scrollbar-track {
						background: $b-gray;
					}

					&::-webkit-scrollbar-thumb {
						background: $dark-gray;
					}
				}

				&__item {
					display: flex;
					align-items: center;
					gap: px2rem(16);
					margin-bottom: px2rem(10);
					cursor: pointer;

					&:last-child {
						margin-bottom: 0;
					}

					.input {
						display: none;

						&:checked + .square {
							background-color: $dark-gray;
							color: $f3-light-gray;
						}
					}

					.square {
						flex-shrink: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 2px solid $dark-gray;
						border-radius: 3px;
						width: px2rem(18);
						height: px2rem(18);
						color: transparent;
						user-select: none;
					}

					.text {
						font-size: px2rem(20);
						line-height: px2rem(30);
						color: $dark-gray;
						user-select: none;
					}
				}
			}
		}
	}

	&__footer {
		margin: 0 px2rem(35);
		padding: px2rem(10) 0;
		border-top: 1px solid $mild-gray;
	}
}
</style>

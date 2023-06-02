<template>
	<div class="tabs">
		<div class="tabs__nav">
			<button
				v-for="(tab, index) in tabs"
				:key="index"
				class="tabs__nav-item"
				:class="{ '--active': tab.title === activeTab.title }"
				@click="changeTab(tab)"
			>
				{{ tab.title }}
			</button>
		</div>
		<div class="tab__body">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'TabContainer',
	provide() {
		return {
			activeTab: () => this.activeTab
		}
	},
	props: {
		activeIndex: {
			type: [String, Number],
			required: false,
			default: 0
		}
	},
	data() {
		return {
			activeTab: null,
			tabs: []
		}
	},
	created() {
		this.tabs = this.$slots.default
			.filter((tab) => tab.componentOptions)
			.map((tab) => ({ title: tab.componentOptions.propsData.title }))
		this.activeTab = this.tabs[this.activeIndex]
	},
	methods: {
		changeTab(tab) {
			this.activeTab = tab
		}
	}
}
</script>

<style lang="scss" scoped>
.tabs {
	&__nav {
		display: flex;
		align-items: center;
		gap: pxToRem(60);
		margin-bottom: pxToRem(32);
		border-bottom: 1px solid $graylighten;
		padding: 0 0 pxToRem(32);

		&-item {
			border: none;
			background: transparent;
			margin: 0;
			padding: 0;
			line-height: pxToRem(24);
			text-transform: uppercase;
			cursor: pointer;

			&.--active {
				font-weight: 600;
			}
		}
	}
}
</style>

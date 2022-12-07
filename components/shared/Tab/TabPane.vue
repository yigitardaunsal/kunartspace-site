<template>
	<div v-show="title === activeTab()?.title" class="tab-pane">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'TabPane',
	inject: ['activeTab'],
	props: {
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped></style>

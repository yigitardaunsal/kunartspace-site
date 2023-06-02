<template>
	<ValidationObserver v-slot="{ handleSubmit }">
		<form class="form" @submit.prevent="handleSubmit(submit)">
			<slot />
		</form>
	</ValidationObserver>
</template>

<script>
export default {
	name: 'AppForm',
	methods: {
		submit() {
			this.$emit('submit')
		}
	}
}
</script>

<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: pxToRem(20);
}
</style>

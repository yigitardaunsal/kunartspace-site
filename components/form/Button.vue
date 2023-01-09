<template>
	<button v-bind="$attrs" class="btn" :class="[`--${variant}`, { '--block': block }]" @click="$emit('click')">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'AppButton',
	props: {
		variant: {
			type: String,
			required: false,
			default: 'primary'
		},
		block: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>

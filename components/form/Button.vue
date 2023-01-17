<template>
	<button
		v-bind="$attrs"
		class="btn"
		:class="[`--${variant}`, { '--block': block }]"
		:disabled="disabled || loading"
		@click="$emit('click')"
	>
		<span class="btn__text" :class="{ '--hidden': loading }">
			<slot />
		</span>
		<span v-if="loading" class="btn__loader"></span>
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
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		loading: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>

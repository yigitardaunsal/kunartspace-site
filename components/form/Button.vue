<template>
	<button
		v-bind="$attrs"
		class="btn"
		:class="[`--${variant}`, { '--block': block, [`--${size}`]: !!size }]"
		:disabled="disabled || loading"
		@click="$emit('click')"
	>
		<span class="btn__text" :class="{ '--hidden': loading }">
			<slot />
		</span>
		<CircleLoader v-if="loading" class="btn__loader" />
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
		size: {
			type: String,
			required: false,
			default: ''
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

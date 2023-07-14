<template>
	<ValidationProvider v-slot="{ invalid, validated, errors }" :name="placeholder" :rules="rules" tag="div">
		<template v-if="!!mask">
			<input
				:type="type"
				:name="name"
				:placeholder="placeholder"
				v-mask="mask"
				class="textbox"
				:class="{ '--invalid': invalid && validated }"
				:disabled="disabled"
				:value="value"
				@input="$emit('input', $event.target.value)"
			/>
		</template>
		<template v-else>
			<input
				:type="type"
				:name="name"
				:placeholder="placeholder"
				class="textbox"
				:class="{ '--invalid': invalid && validated }"
				:disabled="disabled"
				:value="value"
				@input="$emit('input', $event.target.value)"
			/>
		</template>
		<span v-if="errors[0]" class="validate-error">
			{{ errors[0] }}
		</span>
	</ValidationProvider>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
	name: 'AppTextbox',
	directives: { mask },
	props: {
		type: {
			type: String,
			required: false,
			default: 'text'
		},
		name: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
			required: true,
			default: ''
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		value: {
			type: [String, Number],
			required: false,
			default: ''
		},
		rules: {
			type: [String, Object],
			required: false,
			default: ''
		},
		mask: {
			type: String,
			required: false,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.textbox {
	width: 100%;
	height: pxToRem(50);
	border: 1px solid $dark-gray;
	border-radius: pxToRem(5);
	padding: 0 pxToRem(20);
	background-color: transparent;
	color: $dark-gray;

	&::placeholder {
		color: inherit;
	}

	&.--invalid {
		border-color: $alizarin;
		color: $alizarin;
	}
}
</style>

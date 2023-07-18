<template>
	<ValidationProvider v-slot="{ invalid, validated, errors }" :name="placeholder" :rules="rules" tag="div">
		<textarea
			:name="name"
			:placeholder="placeholder"
			:rows="rows"
			class="textarea"
			:class="{ '--invalid': invalid && validated }"
			:value="value"
			@input="$emit('input', $event.target.value)"
		/>
		<span v-if="errors[0]" class="validate-error">
			{{ errors[0] }}
		</span>
	</ValidationProvider>
</template>

<script>
export default {
	name: 'AppTextarea',
	props: {
		name: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
			required: true,
			default: ''
		},
		rows: {
			type: [String, Number],
			required: false,
			default: 2
		},
		value: {
			type: String,
			required: false,
			default: ''
		},
		rules: {
			type: [String, Object],
			required: false,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.textarea {
	width: 100%;
	border: 1px solid $dark-gray;
	border-radius: pxToRem(5);
	padding: pxToRem(20);
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

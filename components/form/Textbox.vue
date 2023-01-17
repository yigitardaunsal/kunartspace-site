<template>
	<ValidationProvider v-slot="{ invalid, validated, errors }" :name="placeholder" :rules="rules" tag="div">
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
		<span v-if="errors[0]" class="validate-error">
			{{ errors[0] }}
		</span>
	</ValidationProvider>
</template>

<script>
export default {
	name: 'AppTextbox',
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
			type: String,
			required: false,
			default: ''
		},
		rules: {
			type: [String, Object],
			required: false,
			default: () => ''
		}
	}
}
</script>

<style lang="scss" scoped>
.textbox {
	width: 100%;
	height: px2rem(50);
	border: 1px solid $dark-gray;
	border-radius: px2rem(5);
	padding: 0 px2rem(20);
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

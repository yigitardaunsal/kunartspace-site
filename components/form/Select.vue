<template>
	<ValidationProvider
		v-slot="{ invalid, validated, errors }"
		:name="placeholder"
		:rules="rules"
		tag="div"
		class="wrapper"
	>
		<div class="icon">
			<CircleArrowSvg width="24" height="24" />
		</div>
		<select
			:name="name"
			class="select"
			:class="{ '--invalid': invalid && validated }"
			:value="value"
			@change="$emit('input', $event.target.value)"
		>
			<option value="" disabled selected>{{ placeholder }}</option>
			<option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
		</select>
		<span v-if="errors[0]" class="validate-error">
			{{ errors[0] }}
		</span>
	</ValidationProvider>
</template>

<script>
import CircleArrowSvg from '@/assets/svg/circle-arrow.svg'

export default {
	name: 'AppSelect',
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
		options: {
			type: Array,
			required: true
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
	},
	components: {
		CircleArrowSvg
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative;
}

.icon {
	position: absolute;
	z-index: -1;
	top: pxToRem(13);
	right: pxToRem(18);
	color: $dark-gray;
}

.select {
	appearance: none;
	width: 100%;
	height: pxToRem(50);
	border: 1px solid $dark-gray;
	border-radius: pxToRem(5);
	padding: 0 pxToRem(20);
	line-height: 1;
	background-color: transparent;
	color: $dark-gray;

	&.--invalid {
		border-color: $alizarin;
		color: $alizarin;
	}
}
</style>

<template>
	<ValidationProvider v-slot="{ invalid, validated, errors }" :name="placeholder" :rules="rules" tag="div">
		<label class="checkbox">
			<input
				:name="name"
				type="checkbox"
				class="checkbox__input"
				:value="value"
				:checked="value"
				@change="$emit('input', $event.target.checked)"
			/>
			<div class="checkbox__square" :class="{ '--invalid': invalid && validated }">
				<CheckIcon width="12" height="12" />
			</div>
			<div class="checkbox__text"><slot /></div>
			<slot name="content" />
		</label>
		<span v-if="errors[0]" class="validate-error">
			{{ errors[0] }}
		</span>
	</ValidationProvider>
</template>

<script>
import CheckIcon from '@/assets/svg/check.svg'

export default {
	name: 'AppCheckbox',
	components: {
		CheckIcon
	},
	props: {
		placeholder: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		rules: {
			type: [String, Object],
			required: false,
			default: ''
		},
		value: {
			type: Boolean,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.checkbox {
	$self: &;
	display: flex;
	align-items: center;
	gap: pxToRem(10);
	cursor: pointer;

	&__input {
		position: absolute;
		opacity: 0;
		z-index: -1;

		&:checked + #{$self}__square {
			border-color: $darklighten;
			background-color: $darklighten;
		}
	}

	&__square {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid $dark-gray;
		border-radius: 3px;
		width: pxToRem(18);
		height: pxToRem(18);
		color: $enlighten;

		&.--invalid {
			border-color: $alizarin;
		}
	}

	&__text {
		font-size: pxToRem(12);
		line-height: 1.3;
		color: $mild-gray;
		user-select: none;
	}

	@include respond-to('x-large') {
		gap: pxToRem(16);
	}
}
</style>

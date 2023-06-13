<template>
	<div class="choiceBox" @click="$emit('change', value)">
		<div class="choiceBox__check" :class="{ '--selected': conditionValue === value }">
			<CheckIcon width="12" height="12" />
		</div>
		<div class="choiceBox__content">
			<h6 class="choiceBox__title">{{ title }}</h6>
			<div class="choiceBox__text"><slot /></div>
		</div>
	</div>
</template>

<script>
import CheckIcon from '@/assets/svg/check.svg'

export default {
	name: 'ChoiceBox',
	components: {
		CheckIcon
	},
	props: {
		conditionValue: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="scss">
.choiceBox {
	display: flex;
	gap: pxToRem(20);
	margin-bottom: pxToRem(30);
	border: 1px solid $b-gray;
	border-radius: pxToRem(5);
	padding: pxToRem(44) pxToRem(38);
	cursor: pointer;

	&__check {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: pxToRem(2) solid $darklighten;
		border-radius: pxToRem(5);
		width: pxToRem(25);
		height: pxToRem(25);
		color: $enlighten;

		&.--selected {
			background-color: $darklighten;
		}
	}

	&__content {
		flex: 1;
		user-select: none;
	}

	&__title {
		font-size: pxToRem(24);
		margin-bottom: pxToRem(18);
		font-weight: 400;
	}

	&__text {
		line-height: pxToRem(24);
		color: $dark-gray;

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin-bottom: pxToRem(3);
			font-size: pxToRem(20);
			line-height: pxToRem(30);
			font-weight: 700;
		}

		p {
			line-height: pxToRem(24);
		}
	}

	&:last-child {
		margin-bottom: 0;
	}

	@include respond-to('x-large') {
		gap: pxToRem(112);
	}
}
</style>

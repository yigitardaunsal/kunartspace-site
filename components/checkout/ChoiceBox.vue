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
	gap: px2rem(112);
	margin-bottom: px2rem(30);
	border: 1px solid $b-gray;
	border-radius: px2rem(5);
	padding: px2rem(44) px2rem(38);
	cursor: pointer;

	&__check {
		display: flex;
		align-items: center;
		justify-content: center;
		border: px2rem(2) solid $darklighten;
		border-radius: px2rem(5);
		width: px2rem(25);
		height: px2rem(25);
		color: $enlighten;

		&.--selected {
			background-color: $darklighten;
		}
	}

	&__content {
		user-select: none;
	}

	&__title {
		font-size: px2rem(24);
		margin-bottom: px2rem(18);
		font-weight: 400;
	}

	&__text {
		line-height: px2rem(24);
		color: $dark-gray;

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin-bottom: px2rem(3);
			font-size: px2rem(20);
			line-height: px2rem(30);
			font-weight: 700;
		}

		p {
			line-height: px2rem(24);
		}
	}

	&:last-child {
		margin-bottom: 0;
	}
}
</style>

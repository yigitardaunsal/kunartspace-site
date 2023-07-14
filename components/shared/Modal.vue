<template>
	<div v-if="isOpen" class="modal" :class="[`--${variant}`]">
		<div class="modal__overlay" @click="$emit('close')"></div>
		<div class="modal__wrapper">
			<div class="modal__header">
				<h5 class="modal__title">{{ title }}</h5>
				<button class="modal__close" @click="$emit('close')"><CloseIcon width="30" height="30" /></button>
			</div>
			<div class="modal__body">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import CloseIcon from '@/assets/svg/close.svg'

export default {
	name: 'AppModal',
	components: {
		CloseIcon
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
			default: false
		},
		variant: {
			type: String,
			requied: false,
			default: 'primary'
		},
		title: {
			type: String,
			required: false,
			default: ''
		}
	},
	watch: {
		isOpen(val) {
			const body = document.body
			body.style.overflowY = 'hidden'

			if (!val) {
				body.style.overflowY = 'auto'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.modal {
	$self: &;
	position: fixed;
	z-index: 2;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	&__overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	&__wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
		border-radius: pxToRem(10);
		width: 90%;

		@include respond-to('x-large') {
			width: 600px;
		}
	}

	&__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	&__title {
		margin-bottom: 0;
		padding: pxToRem(30);
		font-size: pxToRem(22);
		line-height: 1;
		font-weight: 500;
	}

	&__close {
		margin-top: pxToRem(12);
		margin-right: pxToRem(12);
		border: none;
		padding: 0;
		background-color: transparent;
		color: $dark-gray;

		&:hover {
			color: $darklighten;
		}
	}

	&__body {
		padding: 0 pxToRem(30) pxToRem(30);
		max-height: calc(90vh - pxToRem(82));
		overflow-y: scroll;
	}

	&.--primary {
		#{$self} {
			&__overlay {
				background-color: rgba($darklighten, 0.5);
			}

			&__wrapper {
				background-color: $enlighten;
			}
		}
	}

	&.--secondary {
		#{$self} {
			&__overlay {
				background-color: rgba($enlighten, 0.25);
				backdrop-filter: blur(5px);
			}

			&__wrapper {
				background-color: $f3-light-gray;
			}
		}
	}
}
</style>

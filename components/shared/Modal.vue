<template>
	<div v-if="isOpen" class="modal">
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
		background-color: rgba($darklighten, 0.5);
	}

	&__wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		background-color: $enlighten;
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
}
</style>

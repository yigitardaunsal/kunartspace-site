<template>
	<div class="circle-loader" :style="style"></div>
</template>

<script>
export default {
	name: 'CircleLoader',
	props: {
		size: {
			type: [Number, String],
			required: false,
			default: 30
		}
	},
	computed: {
		remSize() {
			return this.size / 16 + 'rem'
		},
		margin() {
			return this.size / -32 + 'rem'
		},
		style() {
			return `width: ${this.remSize}; height: ${this.remSize}; margin-top: ${this.margin}; margin-left: ${this.margin}`
		}
	}
}
</script>

<style lang="scss" scoped>
.circle-loader {
	position: absolute;
	top: 50%;
	left: 50%;
	display: block;
	border: 2px dashed;
	border-radius: 50%;
	animation: turn 1500ms infinite;
}

@keyframes turn {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>

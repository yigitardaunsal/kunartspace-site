<template>
	<button v-bind="$attrs" class="btn" :class="{ '--block': block }" @click="$emit('click')">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'AppButton',
	props: {
		block: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
.btn {
	display: inline-block;
	height: px2rem(50);
	border: none;
	border-radius: px2rem(5);
	padding: 0 px2rem(12);
	background-color: $darklighten;
	font-size: px2rem(15);
	font-weight: 400;
	color: #fff;

	&.--block {
		display: block;
		width: 100%;
	}

	&:hover {
		background-color: $dark-gray;
	}
}
</style>

<template>
	<div class="alert" :class="[`--${variant}`]"><slot /></div>
</template>

<script>
export default {
	name: 'AppAlert',
	props: {
		variant: {
			type: String,
			required: false,
			default: 'success'
		}
	}
}
</script>

<style lang="scss" scoped>
.alert {
	margin-bottom: px2rem(10);
	padding: px2rem(12);
	border-left-width: px2rem(5);
	border-left-style: solid;
	border-radius: px2rem(3);

	&.--success {
		color: #270;
		background-color: #dff2bf;
	}

	&.--info {
		color: #059;
		background-color: #bef;
	}

	&.--warning {
		color: #9f6000;
		background-color: #feefb3;
	}

	&.--danger {
		color: #d8000c;
		background-color: #ffbaba;
	}

	a {
		color: inherit;
		text-decoration: underline;

		&:hover {
			text-decoration: none;
		}
	}
}
</style>

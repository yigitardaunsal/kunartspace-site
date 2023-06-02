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
	margin-bottom: pxToRem(10);
	padding: pxToRem(12);
	border-left-width: pxToRem(5);
	border-left-style: solid;
	border-radius: pxToRem(3);

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

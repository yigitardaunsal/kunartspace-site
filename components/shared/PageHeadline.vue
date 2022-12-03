<template>
	<component
		:is="tag"
		class="page-headline"
		:class="[{ '--bordered': bordered, [`--${size}`]: !!size }, `--${position}`]"
	>
		<slot />
	</component>
</template>

<script>
export default {
	name: 'PageHeadline',
	props: {
		tag: {
			type: String,
			required: false,
			default: () => 'h1'
		},
		size: {
			type: String,
			required: false,
			default: () => ''
		},
		bordered: {
			type: Boolean,
			required: false,
			default: () => true
		},
		position: {
			type: String,
			required: false,
			default: () => 'left'
		}
	}
}
</script>

<style lang="scss" scoped>
.page-headline {
	margin: 0 0 px2rem(46);
	font-size: 30px;
	font-weight: 300;
	line-height: 45px;
	color: $mild-gray;

	&.--bordered {
		padding-bottom: px2rem(30);
		border-bottom: 1px solid $graylighten;
	}

	&.--center {
		text-align: center;
	}

	&.--right {
		text-align: right;
	}

	&.--sm {
		font-size: px2rem(24);
		line-height: px2rem(36);
	}
}
</style>

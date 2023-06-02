<template>
	<component
		:is="tag"
		class="page-headline"
		:class="[{ '--bordered': bordered, [`--${size}`]: !!size, [`--${variant}`]: !!variant }, `--${position}`]"
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
		},
		variant: {
			type: String,
			required: false,
			default: () => ''
		}
	}
}
</script>

<style lang="scss" scoped>
.page-headline {
	margin: 0 0 pxToRem(46);
	font-size: 30px;
	font-weight: 300;
	line-height: 45px;
	color: $mild-gray;

	&.--bordered {
		padding-bottom: pxToRem(30);
		border-bottom: 1px solid $graylighten;
	}

	&.--center {
		text-align: center;
	}

	&.--right {
		text-align: right;
	}

	&.--sm {
		font-size: pxToRem(24);
		line-height: pxToRem(36);
	}

	&.--md {
		font-size: pxToRem(28);
		line-height: pxToRem(40);
	}

	&.--customer {
		margin-bottom: 0;
		font-size: pxToRem(56);
		line-height: pxToRem(84);
		font-weight: 600;
		color: $darklighten;
	}
}
</style>

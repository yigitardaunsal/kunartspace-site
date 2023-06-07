<template>
	<div class="language" :class="{ last: !rightGap }">
		<button
			v-for="(locale, index) in locales"
			:key="index"
			type="button"
			class="language__item"
			:class="{ active: currentLocale === locale }"
			@click="changeLocale(locale)"
		>
			{{ locale.toLocaleUpperCase() }}
		</button>
	</div>
</template>

<script>
export default {
	name: 'TheLanguages',
	props: {
		rightGap: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	computed: {
		currentLocale() {
			return this.$i18n.locale
		},
		locales() {
			return this.$i18n.localeCodes
		}
	},
	methods: {
		changeLocale(localeCode) {
			this.$i18n.setLocale(localeCode)
		}
	}
}
</script>

<style lang="scss" scoped>
.language {
	display: flex;

	&__item {
		flex: 1;
		border: none;
		height: 40px;
		background: transparent;
		font-size: pxToRem(16);
		line-height: pxToRem(20);
		color: $mild-gray;
		cursor: pointer;

		&.active {
			font-weight: 600;
			color: $darklighten;
		}
	}

	@include respond-to('x-large') {
		margin-right: pxToRem(50);

		&__item {
			width: 30px;
			height: auto;
			font-size: pxToRem(12);
			line-height: pxToRem(16);
		}

		&.last {
			margin-right: 0;
		}
	}
}
</style>

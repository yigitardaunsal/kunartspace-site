<template>
	<div>Burası {{ $t('exhibitions') }}</div>
</template>

<script>
export default {
	name: 'ExhebitionsPage',
	layout: 'Footerless',
	nuxtI18n: {
		paths: {
			tr: '/sergiler',
			en: '/exhibitions'
		}
	}
}
</script>

<style lang="sass" scoped></style>

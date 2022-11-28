<template>
	<div>
		<TheHeader>
			<template #nav>
				<TheSiteNav />
			</template>
			<template #social>
				<SocialMedia />
			</template>
		</TheHeader>
		<Nuxt />
	</div>
</template>

<script>
export default {
	name: 'FooterlessLayout'
}
</script>

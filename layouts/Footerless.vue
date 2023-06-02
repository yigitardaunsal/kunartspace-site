<template>
	<div class="footerless-layout">
		<TheHeader>
			<template #nav>
				<TheSiteNav />
			</template>
			<template #social>
				<SocialMedia />
			</template>
		</TheHeader>
		<main class="main">
			<Nuxt />
		</main>
		<TheMobileMenu />
	</div>
</template>

<script>
export default {
	name: 'FooterlessLayout'
}
</script>

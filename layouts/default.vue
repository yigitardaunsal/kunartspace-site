<template>
	<div class="layout --default">
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
		<TheSiteFooter />
	</div>
</template>

<script>
export default {
	name: 'DefaultLayout'
}
</script>

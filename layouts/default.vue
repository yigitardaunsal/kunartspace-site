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
		<TheMobileMenu>
			<TheSiteNav />
		</TheMobileMenu>
	</div>
</template>

<script>
import layout from '../mixins/layout'

export default {
	name: 'DefaultLayout',
	mixins: [layout]
}
</script>

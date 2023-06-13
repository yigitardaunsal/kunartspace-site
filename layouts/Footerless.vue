<template>
	<div class="layout --footerless">
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
		<TheMobileMenu>
			<TheSiteNav />
		</TheMobileMenu>
	</div>
</template>

<script>
import layout from '../mixins/layout'

export default {
	name: 'FooterlessLayout',
	mixins: [layout]
}
</script>

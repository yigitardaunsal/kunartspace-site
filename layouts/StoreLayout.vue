<template>
	<div class="layout --store">
		<TheHeader>
			<template #nav>
				<TheStoreNav />
			</template>
			<template #account>
				<TheAccountNav />
			</template>
		</TheHeader>
		<main class="main">
			<Nuxt />
		</main>
		<TheStoreFooter />
		<TheSearchModal />
		<TheMobileMenu>
			<TheStoreNav />
		</TheMobileMenu>
	</div>
</template>

<script>
import layout from '../mixins/layout'

export default {
	name: 'StoreLayout',
	mixins: [layout]
}
</script>

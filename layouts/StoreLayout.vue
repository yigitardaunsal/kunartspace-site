<template>
	<div class="layout --default">
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
	</div>
</template>

<script>
export default {
	name: 'StoreLayout'
}
</script>

<template>
	<div class="layout --customer">
		<TheHeader>
			<template #nav>
				<TheStoreNav />
			</template>
			<template #account>
				<TheAccountNav />
			</template>
		</TheHeader>
		<main class="main">
			<div class="customer container">
				<div class="row">
					<div class="col-md-4">
						<TheCustomerSidebar />
					</div>
					<div class="col-md-7 offset-md-1">
						<div class="customer-conten">
							<Nuxt />
						</div>
					</div>
				</div>
			</div>
		</main>
		<TheStoreFooter />
	</div>
</template>

<script>
export default {
	name: 'CustomerLayout',
	middleware: ['session-control', 'auth']
}
</script>

<style lang="scss" scoped>
.customer {
	padding-top: pxToRem(50);
}
</style>

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
		<TheMobileMenu>
			<TheStoreNav />
		</TheMobileMenu>
	</div>
</template>

<script>
import layout from '../mixins/layout'

export default {
	name: 'CustomerLayout',
	mixins: [layout],
	middleware: ['session-control', 'auth']
}
</script>

<style lang="scss" scoped>
.customer {
	@include respond-to('x-large') {
		padding-top: pxToRem(50);
	}
}
</style>

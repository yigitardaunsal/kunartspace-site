<template>
	<div class="customer-auth container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<PageHeadline variant="customer" position="center" :bordered="false">{{
					$t('customer.forgot.title')
				}}</PageHeadline>
				<ValidationObserver v-slot="{ handleSubmit }">
					<form class="customer-auth__form" @submit.prevent="handleSubmit(submit)">
						<div class="customer-auth__form-row">
							<Textbox
								v-model="email"
								:name="$t('customer.forgot.form.email')"
								:placeholder="$t('customer.forgot.form.email')"
								rules="required|email"
							/>
						</div>
						<div class="customer-auth__form-row">
							<Button type="submit" block :loading="loading">{{ $t('send') }}</Button>
						</div>
					</form>
				</ValidationObserver>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerForgotPassword',
	layout: 'StoreLayout',
	middleware: 'logged-in',
	data() {
		return {
			loading: false,
			email: ''
		}
	},
	methods: {
		async submit() {
			this.loading = true

			const status = await this.$store.dispatch('forgotPassword', this.email)

			if (status !== 200) {
				this.loading = false
			}

			if (status === 404) {
				this.$toast.open({
					message: this.$t('customer.forgot.messages.notFound'),
					type: 'error'
				})
			}
		}
	}
}
</script>

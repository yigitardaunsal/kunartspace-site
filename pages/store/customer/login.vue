<template>
	<div class="customer-auth container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="customer-auth__header">
					<PageHeadline variant="customer" position="center" :bordered="false">{{
						$t('customer.login.title')
					}}</PageHeadline>
				</div>
				<ValidationObserver v-slot="{ handleSubmit }">
					<form class="customer-auth__form" @submit.prevent="handleSubmit(login)">
						<div class="customer-auth__form-row">
							<Textbox
								v-model="email"
								:name="$t('customer.login.form.email')"
								:placeholder="$t('customer.login.form.email')"
								rules="required|email"
							/>
						</div>
						<div class="customer-auth__form-row">
							<Textbox
								v-model="password"
								type="password"
								:name="$t('customer.login.form.password')"
								:placeholder="$t('customer.login.form.password')"
								rules="required"
							/>
						</div>
						<div class="customer-auth__form-row --high-gap">
							<nuxt-link to="/store/customer/forgot-password" tag="a" class="customer-auth__link">{{
								$t('customer.login.forgotPassword')
							}}</nuxt-link>
						</div>
						<div class="customer-auth__form-row">
							<Button type="submit" block :loading="loading">{{ $t('customer.loginButton') }}</Button>
						</div>
						<div class="customer-auth__form-row">
							<nuxt-link to="/store/customer/register" tag="a" class="btn --tertiary --block">{{
								$t('customer.registerButton')
							}}</nuxt-link>
						</div>
						<div v-if="isGuestCheckOut" class="customer-auth__form-row">
							<nuxt-link
								:to="localePath({ name: 'store-checkout', query: { isGuestCheckOut: true } })"
								tag="a"
								class="btn --tertiary --block"
								>{{ $t('customer.guestCheckout') }}</nuxt-link
							>
						</div>
					</form>
				</ValidationObserver>
				<div class="customer-auth__footer">
					{{ $t('customer.login.footerText') }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerLogin',
	layout: 'StoreLayout',
	middleware: 'logged-in',
	data() {
		return {
			loading: false,
			email: '',
			password: ''
		}
	},
	computed: {
		isGuestCheckOut() {
			return !!this.$route.query?.isGuestCheckOut
		}
	},
	methods: {
		async login() {
			this.loading = true

			const payload = {
				email: this.email,
				password: this.password
			}
			const status = await this.$store.dispatch('login', payload)
			console.log('status', status)

			if (status !== 200) {
				this.loading = false
			}

			if (status === 404) {
				this.$toast.open({
					message: this.$t('customer.login.messages.notFound'),
					type: 'error'
				})
			}
		}
	}
}
</script>

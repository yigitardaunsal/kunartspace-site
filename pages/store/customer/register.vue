<template>
	<div class="customer-auth container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="customer-auth__header">
					<PageHeadline variant="customer" position="center" :bordered="false">{{
						$t('customer.register.title')
					}}</PageHeadline>
				</div>
				<ValidationObserver v-slot="{ handleSubmit }">
					<form class="customer-auth__form" @submit.prevent="handleSubmit(register)">
						<div class="customer-auth__form-row">
							<Textbox
								v-model="firstName"
								:name="$t('customer.register.form.firstName')"
								:placeholder="$t('customer.register.form.firstName')"
								rules="required"
							/>
						</div>
						<div class="customer-auth__form-row">
							<Textbox
								v-model="lastName"
								:name="$t('customer.register.form.lastName')"
								:placeholder="$t('customer.register.form.lastName')"
								rules="required"
							/>
						</div>
						<div class="customer-auth__form-row">
							<Textbox
								v-model="email"
								:name="$t('customer.register.form.email')"
								:placeholder="$t('customer.register.form.email')"
								rules="required|email"
							/>
						</div>
						<div class="customer-auth__form-row">
							<Textbox
								v-model="password"
								type="password"
								:name="$t('customer.register.form.pasword')"
								:placeholder="$t('customer.register.form.password')"
								rules="required|min:8|max:16|password"
							/>
						</div>
						<div class="customer-auth__form-row">
							<div class="permission">
								<Checkbox
									v-model="contactPermission"
									name="contact-permission"
									:placeholder="$t('customer.register.form.contactPermission')"
								>
									{{ $t('customer.register.form.contactPermissionText') }}
								</Checkbox>
							</div>
						</div>
						<div class="customer-auth__form-row --high-gap">
							<div class="permission">
								<Checkbox
									v-model="contractPermission"
									name="contract-permission"
									:placeholder="$t('customer.register.form.contractPermission')"
									:rules="{ required: { allowFalse: false } }"
								>
									{{ $t('customer.register.form.contractPermissionText') }}
								</Checkbox>
							</div>
						</div>
						<div class="customer-auth__form-row">
							<Button type="submit" block :loading="loading">{{ $t('customer.registerButton') }}</Button>
						</div>
					</form>
				</ValidationObserver>
				<div class="customer-auth__footer">
					{{ $t('customer.register.footerText') }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerRegister',
	layout: 'StoreLayout',
	middleware: 'logged-in',
	data() {
		return {
			loading: false,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			contactPermission: false,
			contractPermission: false
		}
	},
	methods: {
		async register() {
			// this.loading = true
			// const payload = {
			// 	fullName: `${this.firstName} ${this.lastName}`,
			// 	email: this.email,
			// 	password: this.password,
			// 	contactPermission: this.contactPermission
			// }
			// const status = await this.$store.dispatch('register', payload)
			// if (status !== 200) {
			// 	this.loading = false
			// }
			// if (status === 409) {
			// 	this.$toast.open({
			// 		message: this.$t('customer.register.messages.conflict'),
			// 		type: 'error'
			// 	})
			// }
		}
	}
}
</script>

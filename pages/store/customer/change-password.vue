<template>
	<div class="customer-page">
		<PageHeadline variant="customer" :bordered="false">{{ $t('customer.changePassword.title') }}</PageHeadline>
		<Form @submit="handleSubmit">
			<FormRow>
				<Textbox
					v-model="formModel.oldPassword"
					type="password"
					:name="$t('customer.changePassword.form.oldPassword')"
					:placeholder="$t('customer.changePassword.form.oldPassword')"
					rules="required|min:8|max:16|password"
				/>
			</FormRow>
			<FormRow>
				<Textbox
					v-model="formModel.newPassword"
					type="password"
					:name="$t('customer.changePassword.form.newPassword')"
					:placeholder="$t('customer.changePassword.form.newPassword')"
					rules="required|min:8|max:16|password"
				/>
			</FormRow>
			<FormRow>
				<Button type="submit" block :loading="loading">Gönder</Button>
			</FormRow>
		</Form>
	</div>
</template>

<script>
export default {
	name: 'CustomerChangePassword',
	layout: 'CustomerLayout',
	data() {
		return {
			loading: false,
			formModel: {
				oldPassword: '',
				newPassword: ''
			}
		}
	},
	methods: {
		async handleSubmit() {
			this.loading = true

			const status = await this.$store.dispatch('changePassword', this.formModel)

			if (status === 200) {
				this.$toast.open(this.$t('customer.changePassword.messages.success'))
				this.$router.push('/store/customer')
				return
			}

			this.loading = false

			if (status === 406) {
				this.$toast.open({
					message: this.$t('customer.changePassword.messages.notAcceptable'),
					type: 'error'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>

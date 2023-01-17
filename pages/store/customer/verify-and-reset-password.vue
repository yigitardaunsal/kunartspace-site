<template>
	<div class="customer-auth container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<PageHeadline variant="customer" position="center" :bordered="false">{{
					$t('customer.resetPassword.title')
				}}</PageHeadline>
				<ValidationObserver v-slot="{ handleSubmit }">
					<form class="customer-auth__form" @submit.prevent="handleSubmit(reset)">
						<div class="customer-auth__form-row">
							<div class="counter">
								<strong class="counter__text --strong">Kalan Süre: </strong>
								<span class="counter__text">{{ counter }} saniye</span>
								<div class="counter__button">
									<Button
										v-if="counter === 0"
										type="button"
										variant="text"
										:disabled="reSendDisabled"
										@click="reSendCode"
									>
										Tekrar kod gönder
									</Button>
								</div>
							</div>
						</div>
						<div class="customer-auth__form-row">
							<Textbox
								v-model="code"
								:name="$t('customer.resetPassword.form.code')"
								:placeholder="$t('customer.resetPassword.form.code')"
								rules="required|digits:6"
								max-lenght="6"
								:disabled="counter === 0"
							/>
						</div>
						<div class="customer-auth__form-row">
							<Textbox
								v-model="password"
								type="password"
								:name="$t('customer.resetPassword.form.password')"
								:placeholder="$t('customer.resetPassword.form.password')"
								rules="required|min:8|max:16|password"
								:disabled="counter === 0"
							/>
						</div>
						<div class="customer-auth__form-row">
							<Button type="submit" block :loading="loading" :disabled="counter === 0">{{ $t('send') }}</Button>
						</div>
					</form>
				</ValidationObserver>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'VerifyAndResetPassword',
	layout: 'StoreLayout',
	middleware: 'logged-in',
	asyncData({ store, redirect }) {
		if (!store.state.forgotPasswordEmail) {
			redirect('/store/customer/forgot-password')
		}
	},
	data() {
		return {
			counter: 180,
			reSendDisabled: false,
			loading: false,
			code: '',
			password: ''
		}
	},
	methods: {
		startCountDown() {
			const countDownInverval = setInterval(() => {
				if (this.counter === 0) {
					clearInterval(countDownInverval)
					return
				}

				this.counter--
			}, 1000)
		},
		async reSendCode() {
			this.reSendDisabled = true
			const status = await this.$store.dispatch('forgotPassword')
			this.reSendDisabled = false

			if (status !== 200) {
				this.$toast.open({
					message: this.$t('messages.general'),
					type: 'error'
				})
				return
			}

			this.counter = 180
			this.startCountDown()
		},
		async reset() {
			if (this.counter === 0) {
				return
			}

			this.loading = true

			const payload = {
				code: this.code,
				password: this.password
			}

			const status = await this.$store.dispatch('verifyAndResetPassword', payload)

			if (status === 200) {
				this.$toast.open({
					message: this.$t('customer.resetPassword.messages.success')
				})
				this.$router.push('/store/customer/login')
				return
			}

			this.loading = false

			if (status === 404) {
				this.$toast.open({
					message: this.$t('customer.resetPassword.messages.wrongCode'),
					type: 'error'
				})
			}

			if (status === 406) {
				this.$toast.open({
					message: this.$t('customer.resetPassword.messages.timeout'),
					type: 'error'
				})
			}
		}
	},
	mounted() {
		this.startCountDown()
	}
}
</script>

<style lang="scss" scoped>
.counter {
	display: flex;
	gap: px2rem(4);

	&__button {
		margin-left: px2rem(10);
	}
}
</style>

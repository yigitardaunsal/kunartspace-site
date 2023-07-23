<template>
	<div class="atelier container">
		<div class="atelier__header">
			<h1 class="atelier__title">{{ atelier.title }}</h1>
			<span class="atelier__instructor-title">{{ $t('atelierPage.instructor') }} :</span>
			<span class="atelier__date">{{ nearestSessionDate }} - {{ nearestSessionTime }}</span>
			<strong class="atelier__instructor">{{ atelier.instructor }}</strong>
		</div>
		<div class="atelier__content">
			<div class="row">
				<div class="col-md-6">
					<div class="sticky">
						<div class="atelier__picture">
							<img :src="atelier.image" :alt="atelier.title" class="img-fluid" />
						</div>
						<div class="atelier__price">
							{{ $t('atelierPage.price') }}: <strong>{{ atelier.price | currency }}</strong>
						</div>
						<div class="atelier__buttons">
							<Button variant="secondary" block @click="openRegisterModal">Atölyeye Katıl</Button>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="atelier__text" v-html="atelier.description" />
				</div>
			</div>
		</div>
		<Modal :is-open="registerModalIsOpen" variant="secondary" title="" @close="closeRegisterModal">
			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="row" @submit.prevent="handleSubmit(onSubmit)">
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="registerForm.name"
								type="text"
								name="name"
								:placeholder="$t('atelierPage.registerForm.name')"
								:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
							/>
						</FormGroup>
					</div>
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="registerForm.surname"
								type="text"
								name="surname"
								:placeholder="$t('atelierPage.registerForm.surname')"
								:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
							/>
						</FormGroup>
					</div>
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="registerForm.email"
								type="email"
								name="email"
								:placeholder="$t('atelierPage.registerForm.email')"
								rules="required|email"
							/>
						</FormGroup>
					</div>
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="registerForm.phone"
								type="text"
								name="phone"
								:placeholder="$t('atelierPage.registerForm.phone')"
								:rules="{ required: 'requied', regex: /^[0-9]*$/ }"
							/>
						</FormGroup>
					</div>
					<div class="col-md-12">
						<FormGroup>
							<Select
								v-model="registerForm.session"
								name="session"
								:placeholder="$t('atelierPage.registerForm.session')"
								:options="sessions"
								rules="required"
							/>
						</FormGroup>
					</div>
					<div class="col-md-12">
						<FormGroup>
							<Textarea
								v-model="registerForm.message"
								name="message"
								:placeholder="$t('atelierPage.registerForm.message')"
								rows="5"
							/>
						</FormGroup>
					</div>
					<div class="col-md-12">
						<FormGroup>
							<Checkbox v-model="payStatus" name="pay" placeholder="payStatus">{{
								$t('atelierPage.payStatus')
							}}</Checkbox>
						</FormGroup>
					</div>
					<template v-if="payStatus">
						<div class="col-md-6">
							<FormGroup>
								<Textbox
									v-model="billingForm.identityNumber"
									type="text"
									:name="$t('atelierPage.billingForm.identityNumber')"
									:placeholder="$t('atelierPage.billingForm.identityNumber')"
									rules="digits:11|identity"
								/>
							</FormGroup>
						</div>
						<div class="col-md-6">
							<FormGroup>
								<Textbox
									v-model="billingForm.billingFullName"
									type="text"
									:name="$t('atelierPage.billingForm.billingFullName')"
									:placeholder="$t('atelierPage.billingForm.billingFullName')"
									:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
								/>
							</FormGroup>
						</div>
						<div class="col-md-6">
							<FormGroup>
								<Textbox
									v-model="billingForm.city"
									type="text"
									:name="$t('atelierPage.billingForm.city')"
									:placeholder="$t('atelierPage.billingForm.city')"
									:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
								/>
							</FormGroup>
						</div>
						<div class="col-md-6">
							<FormGroup>
								<Textbox
									v-model="billingForm.district"
									type="text"
									:name="$t('atelierPage.billingForm.district')"
									:placeholder="$t('atelierPage.billingForm.district')"
									:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
								/>
							</FormGroup>
						</div>
						<div class="col-md-12">
							<FormGroup>
								<Textbox
									v-model="billingForm.address"
									type="text"
									:name="$t('atelierPage.billingForm.address')"
									:placeholder="$t('atelierPage.billingForm.address')"
									rules="required"
								/>
							</FormGroup>
						</div>
					</template>
					<div class="col-md-12 text-end">
						<Button variant="tertiary" size="sm" :loading="buttonLoading">
							{{ submitButton }}
						</Button>
					</div>
				</form>
			</ValidationObserver>
		</Modal>
	</div>
</template>

<script>
export default {
	name: 'AtelierPage',
	layout: 'StoreLayout',
	nuxtI18n: {
		paths: {
			tr: '/magaza/atolye/:slug',
			en: '/store/atelier/:slug'
		}
	},
	async asyncData({ $api, params, $moment, i18n, error }) {
		try {
			const { data: atelier } = await $api.get(`/ateliers/get-detail/${params.slug}`)

			let nearestSession = atelier.sessions[0]

			if (atelier.sessions.length > 1) {
				const foundNearestSession = atelier.sessions.find((session) => new Date(session.date) > new Date())

				if (foundNearestSession) {
					nearestSession = foundNearestSession
				}
			}

			const sessions = atelier.sessions.map((session) => ({
				value: session._id,
				label: `${$moment(session.date).locale(i18n.locale).format('DD MMMM YYYY')} - ${session.time}`
			}))

			return {
				atelier,
				nearestSessionDate: $moment(nearestSession.date).locale(i18n.locale).format('DD MMMM YYYY'),
				nearestSessionTime: nearestSession.time.replaceAll(' ', ''),
				sessions
			}
		} catch (err) {
			error({ statusCode: err.response?.status, message: err.message })
		}
	},
	data() {
		return {
			registerModalIsOpen: false,
			registerForm: {
				name: '',
				surname: '',
				email: '',
				phone: '',
				session: '',
				message: ''
			},
			billingForm: {
				identityNumber: '',
				billingFullName: '',
				address: '',
				city: '',
				district: ''
			},
			payStatus: false,
			buttonLoading: false
		}
	},
	computed: {
		submitButton() {
			return this.payStatus ? this.$t('atelierPage.payAndRegister') : this.$t('atelierPage.register')
		}
	},
	methods: {
		openRegisterModal() {
			this.registerModalIsOpen = true
		},
		closeRegisterModal() {
			this.registerModalIsOpen = false
		},
		onSubmit() {
			this.buttonLoading = true

			if (!this.payStatus) {
				this.register()
				return
			}

			this.payAndRegister()
		},
		register() {
			this.$api
				.post('/ateliers/create-participant', this.registerForm)
				.then(() => {
					this.closeRegisterModal()

					this.registerForm = {
						name: '',
						surname: '',
						email: '',
						phone: '',
						session: '',
						message: ''
					}

					this.billingForm = {
						identityNumber: '',
						billingFullName: '',
						address: '',
						city: '',
						district: ''
					}

					this.$toast.open({
						message: this.$t('atelierPage.successMessage')
					})
				})
				.catch(({ response }) => {
					let message = this.$t('messages.general')

					if (response.data?.showUser) {
						message = response.data?.message
					}

					this.$toast.open({
						message,
						type: 'error'
					})
				})
				.finally(() => (this.buttonLoading = false))
		},
		payAndRegister() {
			const payload = {
				...this.registerForm,
				...this.billingForm
			}

			this.$api
				.post('/payment/atelier', payload)
				.then(({ data }) => {
					window.location.replace(data.paymentPageUrl)
				})
				.catch(({ response }) => {
					let message = this.$t('messages.general')

					if (response.data?.showUser) {
						message = response.data?.message
					}

					this.$toast.open({
						message,
						type: 'error'
					})
				})
				.finally(() => (this.buttonLoading = false))
		}
	},
	mounted() {
		const hasPaymentQuery = Object.hasOwn(this.$route.query, 'payment')

		if (!hasPaymentQuery) return

		if (this.$route.query.payment === 'false') {
			this.$toast.open({
				message: this.$t('atelierPage.successMessageWithoutPayment'),
				type: 'warning'
			})

			return
		}

		this.$toast.open({
			message: this.$t('atelierPage.successMessage')
		})
	}
}
</script>

<style lang="scss" scoped>
.atelier {
	&__header {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		align-items: self-end;
		margin-bottom: pxToRem(68);
	}

	&__title {
		margin-bottom: pxToRem(14);
		font-size: pxToRem(58);
		font-weight: 600;
	}

	&__instructor-title {
		margin-bottom: pxToRem(14);
		font-size: pxToRem(20);
		text-align: right;
		color: $mild-gray;
	}

	&__date {
		font-size: pxToRem(20);
	}

	&__instructor {
		font-size: pxToRem(24);
		font-weight: 500;
	}

	&__price {
		margin: pxToRem(30) 0;
		font-size: pxToRem(20);
		color: $mild-gray;

		strong {
			color: $darklighten;
		}
	}

	&__text {
		padding-left: pxToRem(26);
		font-size: pxToRem(14);
		line-height: pxToRem(20);
		color: $dark-gray;
	}
}

.sticky {
	position: sticky;
	top: pxToRem(10);
}
</style>

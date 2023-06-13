<template>
	<div class="checkout container">
		<div class="checkout__header">
			<PageHeadline variant="customer" position="center" :bordered="false">{{ $t('checkoutPage.title') }}</PageHeadline>
		</div>
		<div v-if="loading" class="checkout__loader">
			<CircleLoader size="100" />
		</div>
		<template v-else>
			<template v-if="cart.products.length">
				<div class="checkout__body">
					<div class="checkout__section --products">
						<CartProducts :products="products" :quantityChangeable="false" @overstock="handleOverStock" />
					</div>
					<div v-if="isGuest" class="checkout__section --guest">
						<h5 class="checkout__title">{{ $t('checkoutPage.guestContactTitle') }}</h5>
						<div class="row">
							<div class="col-md-6">
								<FormGroup>
									<Textbox
										v-model="guestForm.name"
										type="text"
										name="name"
										:placeholder="$t('checkoutPage.guestForm.name')"
										:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
									/>
								</FormGroup>
							</div>
							<div class="col-md-6">
								<FormGroup>
									<Textbox
										v-model="guestForm.surname"
										type="text"
										name="name"
										:placeholder="$t('checkoutPage.guestForm.surname')"
										:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
									/>
								</FormGroup>
							</div>
							<div class="col-md-6">
								<FormGroup>
									<Textbox
										v-model="guestForm.email"
										type="email"
										name="email"
										:placeholder="$t('checkoutPage.guestForm.email')"
										rules="required|email"
									/>
								</FormGroup>
							</div>
							<div class="col-md-6">
								<FormGroup>
									<Textbox
										v-model="guestForm.phone"
										type="number"
										name="phone"
										:placeholder="$t('checkoutPage.guestForm.phone')"
										rules="required"
									/>
								</FormGroup>
							</div>
						</div>
					</div>
					<div class="checkout__section --delivery">
						<h5 class="checkout__title">{{ $t('checkoutPage.deliveryType') }}</h5>
						<ChoiceBox
							:condition-value="selectedAddress"
							value="GALLERY"
							:title="$t('checkoutPage.galleryDelivery')"
							@change="setSelectedAddress"
						>
							{{ $t('checkoutPage.galleryDeliveryDesciption') }}
						</ChoiceBox>
						<template v-if="!isGuest">
							<template v-if="!addresses.length">
								<Alert variant="warning"
									>{{ $t('checkoutPage.noAddressAlert') }}
									<nuxt-link :to="localePath('/store/customer/addresses')" tag="a">{{
										$t('checkoutPage.goToMyAddressPage')
									}}</nuxt-link></Alert
								>
							</template>
							<template v-else>
								<ChoiceBox
									v-for="(address, index) in addresses"
									:key="index"
									:condition-value="selectedAddress"
									:value="address._id"
									:title="address.title"
									@change="setSelectedAddress"
								>
									{{ address.address }} {{ address.district }} / {{ address.city }}
								</ChoiceBox>
							</template>
						</template>
						<template v-else>
							<ChoiceBox
								:condition-value="selectedAddress"
								value="ADDRESS"
								:title="$t('checkoutPage.addressDelivery')"
								@change="setSelectedAddress"
							>
								<div class="row">
									<div class="col-md-12">
										<FormGroup>
											<Textbox
												v-model="guestForm.address"
												type="text"
												name="address"
												:placeholder="$t('checkoutPage.guestForm.address')"
												rules="required"
											/>
										</FormGroup>
									</div>
									<div class="col-md-6">
										<FormGroup>
											<Textbox
												v-model="guestForm.city"
												type="text"
												name="city"
												:placeholder="$t('checkoutPage.guestForm.city')"
												:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
											/>
										</FormGroup>
									</div>
									<div class="col-md-6">
										<FormGroup>
											<Textbox
												v-model="guestForm.district"
												type="text"
												name="district"
												:placeholder="$t('checkoutPage.guestForm.district')"
												:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
											/>
										</FormGroup>
									</div>
								</div>
							</ChoiceBox>
						</template>
					</div>
					<div class="checkout__section">
						<h5 class="checkout__title">{{ $t('checkoutPage.paymentType') }}</h5>
						<ChoiceBox
							:condition-value="selectedPaymentMethod"
							:value="'CREDIT_CARD'"
							:title="$t('checkoutPage.creditCard')"
							@change="setSelectedPaymentMethod"
						>
							{{ $t('checkoutPage.creditCardDescription') }}
						</ChoiceBox>
						<ChoiceBox
							:condition-value="selectedPaymentMethod"
							:value="'BANK_TRANSFER'"
							title="Havale/EFT"
							@change="setSelectedPaymentMethod"
						>
							<div v-html="transferBanks" />
						</ChoiceBox>
					</div>
				</div>
				<div class="checkout__footer row align-items-end">
					<div class="col-md-7 offset-md-1">
						<Checkbox v-model="didAcceptContracts" name="contracts" placeholder="contracts">
							<template #content>
								<div class="checkout__contract">
									{{ $t('checkoutPage.contractText[0]') }}
									<a href="#" @click.self.prevent="showContract('preInformationForm')">{{
										$t('checkoutPage.preInformationForm')
									}}</a
									>{{ $t('checkoutPage.contractText[1]') }}
									<a href="#" @click.self.prevent="showContract('distanceSellingContract')">{{
										$t('checkoutPage.distanceSellingContract')
									}}</a
									>{{ $t('checkoutPage.contractText[2]') }}
								</div>
							</template>
						</Checkbox>
					</div>
					<div class="col-md-4">
						<div class="checkout__summary">
							<CartSummary>
								<template #button>
									<Button
										size="lg"
										block
										:disabled="!didAcceptContracts || overstock"
										:loading="isButtonLoading"
										@click="orderNow"
										>{{ $t('checkoutPage.placeOrder') }}</Button
									>
								</template>
							</CartSummary>
						</div>
					</div>
				</div>
			</template>
			<EmptyCart v-else />
		</template>
		<Modal :is-open="modal.isOpen" :title="modal.title" @close="closeModal">
			<div v-if="!modal.body" class="modal-loader">
				<CircleLoader size="50" />
			</div>
			<div v-else v-html="modal.body" />
		</Modal>
		<div id="iyzipay-checkout-form" class="popup"></div>
	</div>
</template>

<script>
import copMixin from '@/mixins/cop'

export default {
	name: 'CheckoutPage',
	mixins: [copMixin],
	layout: 'StoreLayout',
	async asyncData({ store, $api }) {
		await store.dispatch('fetchAddresses')
		const { data: transferBanks } = await $api.get('/definitions/get-detail/money_transfer_information')
		return {
			transferBanks: transferBanks.definition
		}
	},
	data() {
		return {
			selectedAddress: 'GALLERY',
			selectedPaymentMethod: 'CREDIT_CARD',
			guestForm: {
				name: '',
				surname: '',
				email: '',
				phone: '',
				address: '',
				district: '',
				city: ''
			},
			didAcceptContracts: false,
			isButtonLoading: false,
			modal: {
				isOpen: false,
				title: '',
				body: ''
			},
			preInformationForm: '',
			distanceSellingContract: ''
		}
	},
	computed: {
		isGuest() {
			return !this.$store.getters.getIsAuthenticated
		},
		addresses() {
			return this.$store.state.addresses
		}
	},
	created() {
		if (!('isGuestCheckOut' in this.$route.query) && this.isGuest) {
			const redirectRoute = this.localePath({
				name: 'store-customer-login',
				query: { returnUrl: this.localePath({ name: 'store-checkout' }), isGuestCheckOut: true }
			})

			this.$router.push(redirectRoute)
		}
	},
	methods: {
		setSelectedAddress(value) {
			if (this.selectedAddress === value) return

			const deliveryType = value !== 'GALLERY' ? 'ADDRESS' : value
			this.$store.dispatch('fetchCart', deliveryType)
			this.clearContracts()
			this.selectedAddress = value
		},
		setSelectedPaymentMethod(value) {
			this.clearContracts()
			this.selectedPaymentMethod = value
		},
		closeModal() {
			this.modal.isOpen = false
		},
		orderNow() {
			if (window.iyziInit) {
				window.iyziInit = undefined
				document.querySelector('#iyzipay-script').remove()
			}

			let requestUrl = '/payment'

			const payload = {
				addressId: this.selectedAddress === 'GALLERY' ? '' : this.selectedAddress,
				deliveryType: this.selectedAddress === 'GALLERY' ? 'GALLERY' : 'ADDRESS',
				paymentType: this.selectedPaymentMethod
			}

			if (this.isGuest) {
				requestUrl = '/payment/guest'

				delete payload.addressId
				payload.name = this.guestForm.name
				payload.surname = this.guestForm.surname
				payload.email = this.guestForm.email
				payload.phone = this.guestForm.phone
				payload.address = this.guestForm.address
				payload.city = this.guestForm.city
				payload.district = this.guestForm.district
			}

			this.$api
				.post(requestUrl, payload)
				.then(({ data }) => {
					if (data.paymentType === 'BANK_TRANSFER') {
						this.$router.push(this.localeLocation({ name: 'store-order-received', query: { order: data.order } }))
						return
					}

					const script = document.createElement('script')
					script.type = 'text/javascript'
					script.id = 'iyzipay-script'
					script.innerHTML = data.checkoutFormContent
						.replace('<script type="text/javascript">', '')
						.replace('</scr', '')
						.replace('ipt>', '')
					document.body.append(script)
				})
				.catch((err) => {
					let message = this.$t('messages.general')

					if (err.response.status) {
						message = this.$t('checkoutPage.messages.stockProblem')
					}

					this.$toast.open({
						message,
						type: 'error'
					})
				})
				.finally(() => (this.isButtonLoading = false))
		},
		clearContracts() {
			this.preInformationForm = ''
			this.distanceSellingContract = ''
		},
		async showContract(key) {
			this.modal = {
				isOpen: true,
				title: this.$t(`checkoutPage.${key}`),
				body: ''
			}

			const payload = {
				paymentType: this.selectedPaymentMethod,
				deliveryType: this.selectedAddress === 'GALLERY' ? 'GALLERY' : 'ADDRESS'
			}

			if (this.selectedAddress !== 'GALLERY') {
				if (this.isGuest) {
					payload.name = this.guestForm.name
					payload.surname = this.guestForm.surname
					payload.email = this.guestForm.email
					payload.phone = this.guestForm.phone
					payload.address = this.guestForm.address
					payload.city = this.guestForm.city
					payload.district = this.guestForm.district
					payload.recipient = `${this.guestForm.name} ${this.guestForm.surname}`
				} else {
					const selectedAddress = this.addresses.find((address) => address._id === this.selectedAddress)
					payload.phone = selectedAddress.phone
					payload.address = selectedAddress.address
					payload.city = selectedAddress.city
					payload.district = selectedAddress.district
					payload.recipient = selectedAddress.fullName
				}
			}

			try {
				if (!this[key]) {
					const { data } = await this.$api.post('/payment/get-contracts', payload)
					this.preInformationForm = data.preInformationForm
					this.distanceSellingContract = data.distanceSellingContract
				}

				this.modal.body = this[key]
			} catch (err) {
				this.$toast.open({
					message: this.$t('messages.general'),
					type: 'error'
				})
			}
		},
		handleOverStock() {
			this.clearContracts()
			this.anyOverstock()
		}
	}
}
</script>

<style lang="scss" scoped>
.checkout {
	&__header {
		margin-bottom: pxToRem(90);
	}

	&__loader {
		position: relative;
		height: pxToRem(20);
		color: $dark-gray;
	}

	&__body {
		margin-bottom: pxToRem(55);
	}

	&__section {
		&.--products {
			margin-bottom: pxToRem(56);
		}

		&.--delivery {
			margin-bottom: pxToRem(45);
		}
	}

	&__title {
		font-size: pxToRem(18);
		line-height: pxToRem(27);
		font-weight: 600;
	}

	&__contract {
		line-height: pxToRem(24);
		color: $dark-gray;
	}

	&__summary {
		margin-top: pxToRem(40);

		@include respond-to('x-large') {
			margin-top: 0;
		}
	}
}

.modal-loader {
	position: relative;
	height: pxToRem(50);
}
</style>

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
						<CartProducts :products="products" @overstock="handleOverStock" />
					</div>
					<div class="checkout__section --delivery">
						<h5 class="checkout__title">{{ $t('checkoutPage.deliveryType') }}</h5>
						<ChoiceBox
							:condition-value="selectedAddress"
							:value="'GALLERY'"
							:title="$t('checkoutPage.galleryDelivery')"
							@change="setSelectedAddress"
						>
							{{ $t('checkoutPage.galleryDeliveryDesciption') }}
						</ChoiceBox>
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
	middleware: ['session-control', 'auth'],
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
		addresses() {
			return this.$store.state.addresses
		}
	},
	watch: {
		selectedAddress() {
			this.clearContracts()
		},
		selectedPaymentMethod() {
			this.clearContracts()
		}
	},
	methods: {
		setSelectedAddress(value) {
			this.selectedAddress = value
		},
		setSelectedPaymentMethod(value) {
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

			const payload = {
				addressId: this.selectedAddress === 'GALLERY' ? '' : this.selectedAddress,
				deliveryType: this.selectedAddress === 'GALLERY' ? 'GALLERY' : 'ADDRESS',
				paymentType: this.selectedPaymentMethod
			}

			this.$api
				.post('/payment', payload)
				.then(({ data }) => {
					if (data.paymentType === 'BANK_TRANSFER') {
						this.$router.push(this.localeLocation({ name: 'store-order-received' }))
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
				addressId: this.selectedAddress === 'GALLERY' ? '' : this.selectedAddress,
				paymentType: this.selectedPaymentMethod,
				deliveryType: this.selectedAddress === 'GALLERY' ? 'GALLERY' : 'ADDRESS'
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
		margin-bottom: px2rem(90);
	}

	&__loader {
		position: relative;
		height: px2rem(20);
		color: $dark-gray;
	}

	&__body {
		margin-bottom: px2rem(55);
	}

	&__section {
		&.--products {
			margin-bottom: px2rem(56);
		}

		&.--delivery {
			margin-bottom: px2rem(45);
		}
	}

	&__title {
		font-size: px2rem(18);
		line-height: px2rem(27);
		font-weight: 600;
	}

	&__contract {
		line-height: px2rem(24);
		color: $dark-gray;
	}
}

.modal-loader {
	position: relative;
	height: px2rem(50);
}
</style>

<template>
	<div class="checkout container">
		<div class="checkout__header">
			<PageHeadline variant="customer" position="center" :bordered="false">{{ $t('checkoutPage.title') }}</PageHeadline>
		</div>
		<div v-if="loading" class="checkout__loader">
			<CircleLoader size="100" />
		</div>
		<template v-else>
			<div class="checkout__body">
				<div class="checkout__section --products">
					<CartProducts />
				</div>
				<div class="checkout__section --delivery">
					<h5 class="checkout__title">{{ $t('checkoutPage.deliveryType') }}</h5>
					<ChoiceBox
						:condition-value="selectedAddress"
						:value="'gallery'"
						:title="$t('checkoutPage.galleryDelivery')"
						@change="setSelectedAddress"
					>
						{{ $t('checkoutPage.galleryDeliveryDesciption') }}
					</ChoiceBox>
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
				</div>
				<div class="checkout__section">
					<h5 class="checkout__title">{{ $t('checkoutPage.paymentType') }}</h5>
					<ChoiceBox
						:condition-value="selectedPaymentMethod"
						:value="'credit-card'"
						:title="$t('checkoutPage.creditCard')"
						@change="setSelectedPaymentMethod"
					>
						{{ $t('checkoutPage.creditCardDescription') }}
					</ChoiceBox>
					<ChoiceBox
						:condition-value="selectedPaymentMethod"
						:value="'transfer'"
						title="Havale/EFT"
						@change="setSelectedPaymentMethod"
					>
						<h6>Garanti Bankası</h6>
						<p>Sezer Uğur İnşaat<br />IBAN:TR900006295392871833157182</p>
						<h6>Garanti Bankası</h6>
						<p>Sezer Uğur İnşaat<br />IBAN:TR900006295392871833157182</p>
						<h6>Garanti Bankası</h6>
						<p>Sezer Uğur İnşaat<br />IBAN:TR900006295392871833157182</p>
					</ChoiceBox>
				</div>
			</div>
			<div class="checkout__footer">
				<CartSummary>
					<template #button>
						<nuxt-link to="#" tag="a" class="btn --primary --block --lg">{{ $t('checkoutPage.placeOrder') }}</nuxt-link>
					</template>
				</CartSummary>
			</div>
		</template>
	</div>
</template>

<script>
import copMixin from '@/mixins/cop'

export default {
	name: 'CheckoutPage',
	mixins: [copMixin],
	layout: 'StoreLayout',
	middleware: ['session-control', 'auth'],
	async asyncData({ store }) {
		await store.dispatch('fetchAddresses')
	},
	data() {
		return {
			selectedAddress: 'gallery',
			selectedPaymentMethod: 'credit-card'
		}
	},
	computed: {
		addresses() {
			return this.$store.state.addresses
		}
	},
	methods: {
		setSelectedAddress(value) {
			this.selectedAddress = value
		},
		setSelectedPaymentMethod(value) {
			this.selectedPaymentMethod = value
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
}
</style>

<template>
	<div class="customer-page">
		<div class="customer-page__header">
			<PageHeadline variant="customer" :bordered="false">{{ $t('customer.addresses.title') }}</PageHeadline>
			<Button type="button" variant="tertiary" @click="handleClickNewAddress">{{
				$t('customer.addresses.newButton')
			}}</Button>
		</div>
		<div class="customer-page__body">
			<div v-for="(address, index) in addresses" :key="index" class="address">
				<div class="address__header">
					<h6 class="address__title">{{ address.title }}</h6>
					<span v-if="address.isDefault" class="address__default">{{ $t('customer.defaultAddress') }}</span>
				</div>
				<div class="address__body">
					<div class="address__person">{{ address.person }}</div>
					<p class="address__content">{{ address.address }} {{ address.district }} / {{ address.city }}</p>
				</div>
				<div class="address__footer">
					<div class="address__button">
						<Button type="button" variant="tertiary" block @click="handleClickEditAddress(address)">{{
							$t('edit')
						}}</Button>
					</div>
					<div class="address__button">
						<Button
							type="button"
							variant="tertiary"
							block
							:loading="deletingAddressId.includes(address._id)"
							@click="handleDeleteAddress(address._id)"
							>{{ $t('delete') }}</Button
						>
					</div>
				</div>
			</div>
		</div>
		<Modal :is-open="modal.isOpen" :title="modal.title" @close="closeModal">
			<Form @submit="handleSubmit">
				<FormRow>
					<Textbox
						v-model="formModel.title"
						type="text"
						name="title"
						:placeholder="$t('customer.addresses.form.title')"
						rules="required|min:2|max:25"
					/>
				</FormRow>
				<FormRow>
					<Textbox
						v-model="formModel.fullName"
						type="text"
						name="fullname"
						:placeholder="$t('customer.addresses.form.fullName')"
						rules="required|min:2|max:25"
					/>
				</FormRow>
				<FormRow>
					<Textbox
						v-model="formModel.phone"
						mask="0 (###) ### ## ##"
						type="text"
						name="phone"
						:placeholder="$t('customer.addresses.form.phone')"
						rules="required"
					/>
				</FormRow>
				<FormRow>
					<Textbox
						v-model="formModel.city"
						type="text"
						name="city"
						:placeholder="$t('customer.addresses.form.city')"
						rules="required"
					/>
				</FormRow>
				<FormRow>
					<Textbox
						v-model="formModel.district"
						type="text"
						name="district"
						:placeholder="$t('customer.addresses.form.district')"
						rules="required"
					/>
				</FormRow>
				<FormRow>
					<Textbox
						v-model="formModel.address"
						type="text"
						name="address"
						:placeholder="$t('customer.addresses.form.address')"
						rules="required"
					/>
				</FormRow>
				<FormRow>
					<Checkbox v-model="formModel.isDefault" name="isDefault" placeholder="isDefault">
						{{ $t('customer.addresses.form.makeDefault') }}
					</Checkbox>
				</FormRow>
				<FormRow>
					<Button block :loading="saveLoading">{{ $t('save') }}</Button>
				</FormRow>
			</Form>
		</Modal>
	</div>
</template>

<script>
export default {
	name: 'CustomerAddresses',
	layout: 'CustomerLayout',
	async asyncData({ store }) {
		await store.dispatch('fetchAddresses')
	},
	nuxtI18n: {
		paths: {
			tr: '/store/customer/addresses',
			en: '/store/customer/addresses'
		}
	},
	data() {
		return {
			deletingAddressId: [],
			modal: {
				isOpen: false,
				title: '',
				type: 'new'
			},
			formModel: {
				title: '',
				fullName: '',
				phone: '',
				city: '',
				district: '',
				address: '',
				isDefault: false,
				type: 'delivery'
			},
			saveLoading: false
		}
	},
	computed: {
		addresses() {
			return this.$store.state.addresses
		}
	},
	methods: {
		openModal() {
			this.modal.isOpen = true
		},
		closeModal() {
			this.formModel = {
				title: '',
				fullName: '',
				phone: '',
				city: '',
				district: '',
				address: '',
				isDefault: false,
				type: 'delivery'
			}
			this.modal.isOpen = false
		},
		handleClickNewAddress() {
			this.modal.title = this.$t('customer.addresses.modal.newTitle')
			this.modal.type = 'new'
			this.openModal()
		},
		handleClickEditAddress(address) {
			this.formModel = { ...address }
			this.modal.type = 'edit'
			this.modal.title = this.$t('customer.addresses.modal.editTitle')
			this.openModal()
		},
		handleSubmit() {
			if (this.modal.type === 'new') {
				this.createAddress()
			}
			if (this.modal.type === 'edit') {
				this.editAddress()
			}
		},
		formatPhone() {
			return this.formModel.phone.replaceAll(' ', '').replace('0', '').replace('(', '').replace(')', '')
		},
		async createAddress() {
			this.saveLoading = true

			const phone = this.formatPhone()

			const status = await this.$store.dispatch('createAddress', { ...this.formModel, phone })

			this.saveLoading = false

			if (status !== 201) {
				this.$toast.open({
					message: this.$t('messages.general'),
					type: 'error'
				})
				return
			}

			this.closeModal()
			this.$toast.open(this.$t('customer.addresses.messages.createSuccessful'))
		},
		async editAddress() {
			this.saveLoading = true

			const phone = this.formatPhone()

			const status = await this.$store.dispatch('updateAddress', { ...this.formModel, phone })

			this.saveLoading = false

			if (status !== 200) {
				this.$toast.open({
					message: this.$t('messages.general'),
					type: 'error'
				})
				return
			}

			this.closeModal()
			this.$toast.open(this.$t('customer.addresses.messages.updateSuccessful'))
		},
		async handleDeleteAddress(id) {
			this.deletingAddressId.push(id)

			const status = await this.$store.dispatch('deleteAddress', id)

			if (status !== 200) {
				this.deletingAddressId = []
				this.$toast.open({
					message: this.$t('messages.general'),
					type: 'error'
				})
				return
			}

			this.$toast.open(this.$t('customer.addresses.messages.deletingSuccessful'))
		}
	}
}
</script>

<style lang="scss" scoped>
.address {
	margin-top: pxToRem(25);

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: pxToRem(32);
		border-bottom: 1px solid $graylighten;
		padding-bottom: pxToRem(26);
	}

	&__title {
		margin-bottom: 0;
		font-size: pxToRem(18);
		line-height: pxToRem(26);
		font-weight: 400;
	}

	&__default {
		font-size: pxToRem(14);
		line-height: pxToRem(20);
		text-decoration: underline;
	}

	&__body {
		margin-bottom: pxToRem(40);
	}

	&__person {
		margin-bottom: pxToRem(14);
		font-size: pxToRem(18);
		line-height: pxToRem(26);
	}

	&__content {
		margin-bottom: 0;
		font-size: pxToRem(16);
		line-height: pxToRem(24);
		color: $dark-gray;
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
		gap: pxToRem(24);
	}

	&__button {
		width: pxToRem(160);
	}

	&:last-child {
		margin-bottom: 0;
	}
}
</style>

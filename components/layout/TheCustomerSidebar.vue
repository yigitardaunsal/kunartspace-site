<template>
	<div class="sidebar">
		<div class="nav">
			<nuxt-link :to="localePath('/store/customer')" tag="a" class="nav__item">{{
				$t('customer.nav.orders')
			}}</nuxt-link>
			<nuxt-link :to="localePath('/store/customer/addresses')" tag="a" class="nav__item">{{
				$t('customer.nav.addresses')
			}}</nuxt-link>
			<nuxt-link :to="localePath('/store/customer/favourites')" tag="a" class="nav__item">{{
				$t('customer.nav.favourites')
			}}</nuxt-link>
		</div>
		<div class="account">
			<div class="account__header">
				<h4 class="account__title">{{ $t('customer.accountTitle') }}</h4>
				<span class="account__icon">
					<ProfiileIcon width="24" height="24" />
				</span>
			</div>
			<div class="account__body">
				<div class="account__row">
					{{ customer.fullName }}
				</div>
				<div class="account__row">
					{{ customer.email }}
				</div>
				<template v-if="customer.defaultAddress">
					<div class="account__row --title">
						{{ $t('customer.defaultAddress') }}
					</div>
					<div class="account__row">
						{{ customer.defaultAddress.address }}
						<br />
						{{ customer.defaultAddress.district }} / {{ customer.defaultAddress.city }}
					</div>
				</template>
			</div>
		</div>
		<div class="change-password">
			<nuxt-link to="/store/customer/change-password" tag="a" class="change-password__link">{{
				$t('customer.resetMyPassword')
			}}</nuxt-link>
		</div>
		<div class="logout">
			<Button type="button" variant="tertiary" block @click="logout">{{ $t('customer.logoutButton') }}</Button>
		</div>
	</div>
</template>

<script>
import ProfiileIcon from '@/assets/svg/profile.svg'

export default {
	name: 'TheCustomerSidebar',
	components: {
		ProfiileIcon
	},
	computed: {
		customer() {
			return this.$store.state.customer
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
		}
	}
}
</script>

<style lang="scss" scoped>
.sidebar {
	display: none;

	@include respond-to('x-large') {
		display: block;
	}
}

.nav {
	display: flex;
	flex-direction: column;
	gap: pxToRem(25);
	margin-bottom: pxToRem(52);

	&__item {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid $darklighten;
		border-radius: pxToRem(4);
		height: pxToRem(65);
		padding: 0 pxToRem(15);
		font-size: pxToRem(18);
		line-height: pxToRem(26);
		color: $darklighten;

		&:hover,
		&.nuxt-link-exact-active {
			background-color: $darklighten;
			color: $enlighten;
		}
	}
}

.account {
	margin-bottom: pxToRem(35);

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: pxToRem(20);
		border-bottom: 1px solid $graylighten;
		height: pxToRem(50);
		padding-bottom: pxToRem(24);
	}

	&__title {
		margin-bottom: 0;
		font-size: pxToRem(32);
		font-weight: 400;
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: pxToRem(20);
	}

	&__row {
		line-height: pxToRem(24);
		color: $dark-gray;

		&.--title {
			font-size: pxToRem(14);
			line-height: pxToRem(21);
			font-weight: 500;
			text-decoration: underline;
			color: $darklighten;
		}
	}
}

.change-password {
	margin-bottom: pxToRem(20);

	&__link {
		line-height: pxToRem(24);
		text-decoration: underline;
		color: $darklighten;

		&:hover {
			color: $mild-gray;
		}
	}
}
</style>

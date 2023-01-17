<template>
	<div class="sidebar">
		<div class="nav">
			<nuxt-link to="/store/customer" tag="a" class="nav__item">{{ $t('customer.nav.orders') }}</nuxt-link>
			<nuxt-link to="#" tag="a" class="nav__item">{{ $t('customer.nav.addresses') }}</nuxt-link>
			<nuxt-link to="#" tag="a" class="nav__item">{{ $t('customer.nav.favourites') }}</nuxt-link>
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
				<div class="account__row --title">
					{{ $t('customer.defaultAddress') }}
				</div>
				<div class="account__row">Hürriyet mah. Bosna sk. No: 26 B2 Blok Daire: 31 Kartal / İstanbul</div>
			</div>
		</div>
		<div class="change-password">
			<nuxt-link to="#" tag="a" class="change-password__link">{{ $t('customer.resetMyPassword') }}</nuxt-link>
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
.nav {
	display: flex;
	flex-direction: column;
	gap: px2rem(25);
	margin-bottom: px2rem(52);

	&__item {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid $darklighten;
		border-radius: px2rem(4);
		height: px2rem(65);
		padding: 0 px2rem(15);
		font-size: px2rem(18);
		line-height: px2rem(26);
		color: $darklighten;

		&:hover,
		&.nuxt-link-exact-active {
			background-color: $darklighten;
			color: $enlighten;
		}
	}
}

.account {
	margin-bottom: px2rem(35);

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: px2rem(20);
		border-bottom: 1px solid $graylighten;
		height: px2rem(50);
		padding-bottom: px2rem(24);
	}

	&__title {
		margin-bottom: 0;
		font-size: px2rem(32);
		font-weight: 400;
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: px2rem(20);
	}

	&__row {
		line-height: px2rem(24);
		color: $dark-gray;

		&.--title {
			font-size: px2rem(14);
			line-height: px2rem(21);
			font-weight: 500;
			text-decoration: underline;
			color: $darklighten;
		}
	}
}

.change-password {
	margin-bottom: px2rem(20);

	&__link {
		line-height: px2rem(24);
		text-decoration: underline;
		color: $darklighten;

		&:hover {
			color: $mild-gray;
		}
	}
}
</style>

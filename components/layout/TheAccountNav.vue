<template>
	<div class="account-nav">
		<button class="account-nav__button" @click="openSearchModal">
			<SearchIcon width="25" height="25" />
		</button>
		<nuxt-link :to="customerUrl" tag="a" class="account-nav__item" :class="{ '--active': inCustomerPages }">
			<AccountIcon width="25" height="25" />
		</nuxt-link>
		<div class="account-nav__item --basket" :class="{ '--open': isMiniBasketOpen, '--active': isMiniBasketOpen }">
			<button class="account-nav__button" @click="toggleMiniBasketOpen">
				<BasketIcon width="25" height="25" />
			</button>
			<TheMiniBasket v-if="isMiniBasketOpen" />
		</div>
	</div>
</template>

<script>
import SearchIcon from '@/assets/svg/search.svg'
import AccountIcon from '@/assets/svg/account.svg'
import BasketIcon from '@/assets/svg/basket.svg'

export default {
	name: 'TheAccountNav',
	components: {
		SearchIcon,
		AccountIcon,
		BasketIcon
	},
	data() {
		return {
			isMiniBasketOpen: false
		}
	},
	computed: {
		customerUrl() {
			if (this.inCustomerPages) {
				return this.localePath({
					name: 'store-customer-login'
				})
			}

			return this.$store.getters.getIsAuthenticated
				? this.localePath({ name: 'store-customer' })
				: this.localePath({ name: 'store-customer-login', query: { returnUrl: this.$route.path } })
		},
		inCustomerPages() {
			return this.$route.path.includes('customer')
		}
	},
	mounted() {
		document.addEventListener('click', this.onClickOutsideFromMiniBasket)
	},
	beforeDestroy() {
		document.removeEventListener('click', this.onClickOutsideFromMiniBasket)
	},
	methods: {
		openSearchModal() {
			this.$store.commit('SET_IS_OPEN_SEARCH_MODAL', true)
		},
		toggleMiniBasketOpen() {
			if (!this.isMiniBasketOpen) {
				this.$store.dispatch('fetchCart')
			}

			this.isMiniBasketOpen = !this.isMiniBasketOpen
		},
		onClickOutsideFromMiniBasket({ target }) {
			const closestDiv = target.closest('div')
			if (closestDiv && !closestDiv.classList.contains('--basket') && !closestDiv.classList.contains('mini-basket')) {
				this.isMiniBasketOpen = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.account-nav {
	display: none;
	align-items: center;
	gap: pxToRem(20);
	margin-right: pxToRem(56);

	&__item {
		position: relative;
		color: $dark-gray;

		&:hover,
		&.--active {
			color: $darklighten;
		}

		&.--basket {
			&.--open {
				&::after {
					content: '';
					position: absolute;
					z-index: -1;
					top: calc(100% + pxToRem(24));
					left: 50%;
					transform: translateX(-50%) rotate(45deg);
					display: block;
					width: pxToRem(39);
					height: pxToRem(39);
					background-color: $f3-light-gray;
				}
			}
		}
	}

	&__button {
		border: none;
		padding: 0;
		background-color: transparent;
		color: $dark-gray;

		&:hover {
			color: $darklighten;
		}
	}

	@include respond-to('x-large') {
		display: flex;
	}
}
</style>

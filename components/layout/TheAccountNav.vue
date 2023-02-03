<template>
	<div class="account-nav">
		<a href="#" class="account-nav__item">
			<SearchIcon width="25" height="25" />
		</a>
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
			return this.$store.getters.getIsAuthenticated
				? '/store/customer'
				: `/store/customer/login?returnUrl=${this.$route.path}`
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
		toggleMiniBasketOpen() {
			if (!this.isMiniBasketOpen) {
				this.$store.dispatch('getCart')
			}

			this.isMiniBasketOpen = !this.isMiniBasketOpen
		},
		onClickOutsideFromMiniBasket({ target }) {
			const closestDiv = target.closest('div')
			if (!closestDiv.classList.contains('--basket') && !closestDiv.classList.contains('mini-basket')) {
				this.isMiniBasketOpen = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.account-nav {
	display: flex;
	align-items: center;
	gap: px2rem(20);
	margin-right: px2rem(56);

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
					top: calc(100% + px2rem(24));
					left: 50%;
					transform: translateX(-50%) rotate(45deg);
					display: block;
					width: px2rem(39);
					height: px2rem(39);
					background-color: $f3-light-gray;
				}
			}
		}
	}

	&__button {
		border: none;
		padding: 0;
		background-color: transparent;
		color: inherit;
	}
}
</style>

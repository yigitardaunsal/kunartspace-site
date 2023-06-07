<template>
	<transition name="fade" @after-enter="isWrapperShowing = true">
		<div v-if="isOverlayShowing" class="mobile-menu">
			<div class="mobile-menu__overlay" @click="isWrapperShowing = false"></div>
			<transition name="slide" @after-leave="isOverlayShowing = false">
				<div v-if="isWrapperShowing" class="mobile-menu__wrapper">
					<div class="mobile-menu__header">
						<nuxt-link :to="localePath('index')" tag="a" class="logo">
							<Logo />
						</nuxt-link>
					</div>
					<div class="mobile-menu__nav">
						<slot />
					</div>
					<div class="mobile-menu__footer">
						<div class="languages">
							<TheLanguages />
						</div>
						<div class="social">
							<SocialMedia />
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
import Logo from '@/assets/svg/logo.svg'

export default {
	name: 'TheMobileMenu',
	components: {
		Logo
	},
	data() {
		return {
			isWrapperShowing: false
		}
	},
	computed: {
		isOverlayShowing: {
			get() {
				return this.$store.state.isOpenMobileMenu
			},
			set(val) {
				this.$store.commit('SET_IS_OPEN_MOBILE_MENU', val)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.fade {
	&-enter-active,
	&-leave-active {
		transition: 150ms opacity;
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}
}

.slide {
	&-enter-active,
	&-leave-active {
		transition: 200ms transform;
	}

	&-enter,
	&-leave-to {
		transform: translateX(100%);
	}
}

.mobile-menu {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;

	&__overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		background-color: rgba($darklighten, 0.5);
	}

	&__wrapper {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		width: calc(100% - 50px);
		height: 100%;
		background-color: $enlighten;
	}

	&__header {
		padding: pxToRem(20) pxToRem(25);
		border-bottom: 1px solid $b-gray;

		.logo {
			color: $darklighten;
		}
	}

	&__footer {
		margin: auto 0 pxToRem(10);

		.languages {
			border-bottom: 1px solid $b-gray;
			padding-bottom: pxToRem(10);
		}
	}

	@include respond-to('x-large') {
		display: none;
	}
}
</style>

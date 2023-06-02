<template>
	<transition name="fade" @after-enter="isWrapperShowing = true">
		<div v-if="isOverlayShowing" class="mobile-menu">
			<div class="mobile-menu__overlay" @click="isWrapperShowing = false"></div>
			<transition name="slide" @after-leave="isOverlayShowing = false">
				<div v-if="isWrapperShowing" class="mobile-menu__wrapper">wrapper</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'TheMobileMenu',
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
		width: calc(100% - 50px);
		height: 100%;
		background-color: $enlighten;
	}

	@include respond-to('x-large') {
		display: none;
	}
}
</style>

<template>
	<div class="social-media">
		<a href="https://www.facebook.com/kunartspace/" target="_blank" class="social-media__link">
			<FacebookIcon width="24" />
		</a>
		<a href="https://twitter.com/kunartspace" target="_blank" class="social-media__link">
			<TwitterIcon width="24" />
		</a>
		<a href="https://www.instagram.com/kunartspace/" target="_blank" class="social-media__link">
			<InstagramIcon width="24" />
		</a>
	</div>
</template>

<script>
import FacebookIcon from '@/assets/svg/facebook.svg'
import TwitterIcon from '@/assets/svg/twitter.svg'
import InstagramIcon from '@/assets/svg/instagram.svg'

export default {
	name: 'SocialMedia',
	components: {
		FacebookIcon,
		TwitterIcon,
		InstagramIcon
	}
}
</script>

<style lang="scss" scoped>
.social-media {
	display: inline-grid;
	grid-template-columns: repeat(3, pxToRem(24));
	column-gap: pxToRem(18);

	&__link {
		color: $mild-gray;

		&:hover {
			color: $darklighten;
		}
	}
}
</style>

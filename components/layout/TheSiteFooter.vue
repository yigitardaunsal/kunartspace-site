<template>
	<footer class="footer container">
		<div class="footer__inner">
			<div class="row align-items-end">
				<div class="col-md-8">
					<div class="footer__texts">
						<span class="footer__text">{{ year }} KUN ART SPACE {{ $t('footer.copyright') }}</span>
						<span class="footer__text">SITE BY AZ AJANS</span>
					</div>
				</div>
				<div class="col-md-4 footer__social">
					<div class="footer__logo">
						<Kuzgun width="51" height="40" />
					</div>
					<SocialMedia />
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<a href="mailto:info@kunartspace.com" class="footer__link --contact">info@kunartspace.com</a>
				</div>
			</div>
		</div>
	</footer>
</template>
<script>
import Kuzgun from '@/assets/svg/kuzgun.svg'

export default {
	name: 'TheSiteFooter',
	components: {
		Kuzgun
	},
	computed: {
		year() {
			return new Date().getFullYear()
		}
	}
}
</script>

<style lang="scss" scoped>
.footer {
	&__inner {
		border-top: 1px solid $graylighten;
		padding: pxToRem(40) 0 pxToRem(42);
	}

	&__social {
		text-align: right;
	}

	&__texts {
		display: flex;
		justify-content: space-between;
		font-size: pxToRem(12);
		font-weight: 300;
		line-height: pxToRem(20);
		color: $b-gray;
	}

	&__link {
		&.--contact {
			font-size: pxToRem(12);
			font-weight: 400;
			line-height: pxToRem(16);
			color: $dark-gray;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	&__logo {
		margin-bottom: pxToRem(20);
	}
}
</style>

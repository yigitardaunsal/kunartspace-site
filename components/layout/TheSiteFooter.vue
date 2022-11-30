<template>
	<footer class="footer container">
		<div class="footer__inner">
			<div class="row align-items-center">
				<div class="col-md-8">
					<div class="footer__texts">
						<span class="footer__text">{{ year }} KUN ART SPACE {{ $t('footer.copyright') }}</span>
						<span class="footer__text">SITE BY AZ AJANS</span>
					</div>
				</div>
				<div class="col-md-4 footer__social">
					<SocialMedia />
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<a href="mailto:info@kuzgunartspace.com" class="footer__link --contact">info@kuzgunartspace.com</a>
				</div>
			</div>
		</div>
	</footer>
</template>
<script>
export default {
	name: 'TheSiteFooter',
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
		padding: px2rem(40) 0 px2rem(42);
	}

	&__social {
		text-align: right;
	}

	&__texts {
		display: flex;
		justify-content: space-between;
		font-size: px2rem(12);
		font-weight: 300;
		line-height: px2rem(20);
		color: $b-gray;
	}

	&__link {
		&.--contact {
			font-size: px2rem(12);
			font-weight: 400;
			line-height: px2rem(16);
			color: $dark-gray;

			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>

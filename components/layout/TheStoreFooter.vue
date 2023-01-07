<template>
	<footer class="footer container">
		<div class="footer__inner row">
			<div class="col-md-2">
				<div class="footer__block">
					<h6 class="footer__title">{{ $t('nav.corporate') }}</h6>
					<nuxt-link
						:to="localePath({ name: 'constant', params: { slug: `${$t('constantPageLinks.about')}` } })"
						class="footer__link"
						>{{ $t('nav.about') }}</nuxt-link
					>
					<nuxt-link :to="localePath('contact')" class="footer__link">{{ $t('nav.contact') }}</nuxt-link>
				</div>
			</div>
			<div class="col-md-3">
				<div class="footer__block">
					<h6 class="footer__title">Kuzgun Art Store</h6>
					<a href="#" class="footer__link">Kişisel Verilerin Korunması</a>
					<a href="#" class="footer__link">Mesafeli Satış Sözleşmesi</a>
					<a href="#" class="footer__link">Gizlilik ve Güvenlik İlkeleri</a>
					<a href="#" class="footer__link">İptal ve İade Prosedürü</a>
					<a href="#" class="footer__link">Çerezler</a>
				</div>
			</div>
			<div class="col-md-4 offset-md-1">
				<div class="footer__block">
					<h6 class="footer__title">İletişim</h6>
					<a href="tel:903222255640" class="footer__link">+90 322 225 56 40</a>
					<a href="mailto:info@kunartspace.com" class="footer__link">info@kunartspace.com</a>
					<div class="newsletter">
						<span class="newsletter__text">{{ $t('newsletter.title') }} :</span>
						<div class="newsletter__textbox">
							<input type="text" :placeholder="$t('newsletter.placeholder')" class="newsletter__input" />
							<button class="newsletter__button">
								<ArrowRightIcon width="24" height="24" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="footer__block --social">
					<Kuzgun width="51" height="40" />
					<SocialMedia />
				</div>
			</div>
		</div>
		<div class="footer__bottom">
			<div class="sub-info">
				<img src="/images/cards.png" alt="Cards" class="sub-info__picture img-fluid" />
				<span class="sub-info__text --copyright">{{ year }} KUN ART SPACE {{ $t('footer.copyright') }}</span>
				<span class="sub-info__text --agence">SITE BY AZ AJANS</span>
			</div>
		</div>
	</footer>
</template>

<script>
import ArrowRightIcon from '@/assets/svg/arrow-right.svg'
import Kuzgun from '@/assets/svg/kuzgun.svg'

export default {
	name: 'TheStoreFooter',
	components: {
		ArrowRightIcon,
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
	margin-top: px2rem(116);

	&__inner {
		padding: px2rem(60) 0;
		border-top: 1px solid $graylighten;
		border-bottom: 1px solid $graylighten;
	}

	&__block {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;

		&.--social {
			align-items: flex-end;
			justify-content: space-between;
		}

		.newsletter {
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: auto;

			&__text {
				margin-bottom: px2rem(18);
				font-size: px2rem(15);
				line-height: px2rem(22);
			}

			&__textbox {
				display: flex;
				overflow: hidden;
				height: px2rem(43);
				border: 1px solid $b-gray;
				border-radius: px2rem(5);
				color: $b-gray;
			}

			&__input {
				flex: 1;
				border: none;
				padding: 0 px2rem(18);
				font-size: px2rem(15);
				color: inherit;

				&::placeholder {
					color: inherit;
				}
			}

			&__button {
				border: none;
				background-color: transparent;
				padding: 0 px2rem(10);
				color: inherit;
			}
		}
	}

	&__title {
		margin-bottom: px2rem(20);
		font-size: px2rem(18);
		line-height: px2rem(27);
		font-weight: 500;
	}

	&__link {
		margin-bottom: px2rem(12);
		font-size: px2rem(18);
		line-height: px2rem(27);
		color: $b-gray;

		&:last-child {
			margin-bottom: 0;
		}

		&:hover {
			color: initial;
		}
	}

	&__bottom {
		display: flex;
		justify-content: center;
		padding: px2rem(44) 0 px2rem(56);

		.sub-info {
			display: inline-grid;
			grid-template-areas:
				'picture picture'
				'copyright agence';
			gap: px2rem(15);

			&__picture {
				grid-area: picture;
			}

			&__text {
				font-size: px2rem(12);
				line-height: px2rem(20);
				font-weight: 300;
				color: $b-gray;

				&.--copyright {
					grid-area: copyright;
				}

				&.--agence {
					grid-area: agence;
					text-align: right;
				}
			}
		}
	}
}
</style>

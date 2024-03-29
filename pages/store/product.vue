<template>
	<div class="work container-xxxl">
		<div class="row">
			<div class="col-md-6">
				<VueSlickCarousel ref="heroSlider" v-bind="sliderSettings">
					<div v-for="(image, index) in work.gallery" :key="index" class="work__picture">
						<img :src="image" :alt="work.name" class="work__image img-fluid" />
					</div>
				</VueSlickCarousel>
			</div>
			<div class="col-md-5 offset-md-1">
				<div class="work__detail">
					<span class="work__stock --code">{{ $t('workPage.stockCode') }}: {{ work.stockCode }}</span>
					<span v-if="work.stock > 0" class="work__stock --amount"
						>{{ $t('workPage.stockAmount') }}: {{ work.stock }}</span
					>
					<span v-else class="work__stock --out-of-stock">{{ $t('workPage.outOfStock') }}</span>
					<h1 class="work__artist">
						<nuxt-link
							:to="`${localePath({ name: 'artist', params: { slug: work.artist.link } })}?${$t(
								'artistPage.works'
							).toLowerCase()}`"
							tag="a"
							>{{ work.artist.name }}</nuxt-link
						>
					</h1>
					<h2 class="work__name">{{ work.name }}</h2>
					<div class="work__description" v-html="work.description" />
					<span class="work__price"
						>{{ work.price | currency }} <template v-if="work.hasVat">(+{{ $t('vat') }})</template></span
					>
					<div class="work__buttons">
						<AddToCartButton :loading="addToCartLoading" :disabled="work.stock === 0" @click="addToCart" />
						<Button
							variant="text"
							class="work__favorite"
							:class="{ '--filled': work.inFavorite }"
							:loading="favoriteLoading"
							@click="handleClickFavorite"
						>
							<HeartIcon v-if="!work.inFavorite" width="35" height="35" />
							<FilledHeartIcon v-else width="35" height="35" />
						</Button>
					</div>
					<div class="work__buttons">
						<Button block :disabled="addToCartLoading || work.stock === 0" @click="buyNow">{{ $t('buyNow') }}</Button>
					</div>
					<div class="work__contact">
						<a href="https://wa.me/905383883838" target="_blank" class="whatsapp">
							<span class="whatsapp__text">{{ $t('workPage.whatsappText') }}</span>
							<span class="whatsapp__icon"><WhatsappIcon widht="24" height="24" /></span>
						</a>
						<div class="phone">
							<p class="phone__text">{{ $t('workPage.contactText') }}:</p>
							<a href="tel:0903222255640" class="phone__number">+90 322 225 56 40</a>
							<a href="tel:0905383883838" class="phone__number">+90 538 388 38 38</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import HeartIcon from '@/assets/svg/heart-tick.svg'
import FilledHeartIcon from '@/assets/svg/heart-tick-filled.svg'
import WhatsappIcon from '@/assets/svg/whatsapp.svg'

export default {
	name: 'ProductPage',
	components: {
		HeartIcon,
		FilledHeartIcon,
		WhatsappIcon
	},
	layout: 'StoreLayout',
	nuxtI18n: {
		paths: {
			tr: '/magaza/urun/:slug',
			en: '/store/product/:slug'
		}
	},
	async asyncData({ $api, error, params }) {
		try {
			const { data } = await $api.get(`/works/get-detail/${params.slug}`)

			return {
				work: data
			}
		} catch (err) {
			error({ statusCode: err.response.status, message: err.message })
		}
	},
	data() {
		return {
			sliderSettings: {
				arrows: false,
				dots: true,
				autoplay: true,
				autoplaySpeed: 3000
			},
			favoriteLoading: false,
			addToCartLoading: false
		}
	},
	computed: {
		isAuth() {
			return this.$store.getters.getIsAuthenticated
		},
		accessToken() {
			return this.$store.state.accessToken
		}
	},
	methods: {
		async handleClickFavorite() {
			if (!this.isAuth) {
				this.$router.push(this.localeLocation({ name: 'store-customer-login', query: { returnUrl: this.$route.path } }))
				return
			}

			this.favoriteLoading = true

			try {
				if (!this.work.inFavorite) {
					await this.$api.post('/customers/add-to-favorites', {
						workId: this.work._id
					})
				} else {
					await this.$api.delete(`/customers/remove-from-favorites/${this.work._id}`)
				}

				this.work.inFavorite = !this.work.inFavorite
				this.favoriteLoading = false
			} catch (err) {
				this.$toast.open({
					message: this.$t('messages.general'),
					type: 'error'
				})
			}
		},
		async addToCart() {
			this.addToCartLoading = true
			const status = await this.$store.dispatch('addToCart', {
				productId: this.work._id
			})

			if (status === 200) {
				this.$toast.open(this.$t('workPage.messages.success'))
			}

			if (status === 406) {
				this.$toast.open({
					message: this.$t('workPage.messages.notAcceptable'),
					type: 'error'
				})
			}

			this.addToCartLoading = false
			return status
		},
		async buyNow() {
			const status = await this.addToCart()

			if (status === 200) this.$router.push(this.localeLocation({ name: 'store-checkout' }))
		}
	}
}
</script>

<style lang="scss" scoped>
.work {
	padding-top: pxToRem(40);

	&__image {
		user-drag: none;
		-webkit-user-drag: none;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}

	&__detail {
		max-width: pxToRem(420);
		padding-top: pxToRem(42);
	}

	&__stock {
		display: block;
		font-size: pxToRem(12);
		line-height: pxToRem(18);
		color: $mild-gray;

		&.--amount {
			margin-bottom: pxToRem(34);
		}

		&.--out-of-stock {
			margin-bottom: pxToRem(34);
			color: $alizarin;
		}
	}

	&__artist {
		margin-bottom: pxToRem(2);
		font-size: pxToRem(56);
		line-height: pxToRem(84);
		font-weight: 600;

		a {
			color: inherit;

			&:hover {
				color: $dark-gray;
			}
		}
	}

	&__name {
		margin-bottom: pxToRem(20);
		font-size: pxToRem(24);
		line-height: pxToRem(28);
		font-weight: 400;
	}

	&__description {
		margin-bottom: pxToRem(60);
		font-size: pxToRem(14);
		line-height: pxToRem(21);
		color: $dark-gray;

		p:last-child {
			margin-bottom: 0;
		}
	}

	&__price {
		display: block;
		margin-bottom: pxToRem(50);
		font-size: pxToRem(20);
		line-height: pxToRem(30);
	}

	&__buttons {
		display: flex;
		align-items: center;
		gap: pxToRem(38);

		& > *:first-child {
			flex: 1;
		}
	}

	&__buttons {
		margin-bottom: pxToRem(22);
	}

	&__favorite {
		border: none;
		padding: 0;
		background: transparent;
		color: $dark-gray;

		&:hover {
			color: $darklighten;
		}

		&.--filled {
			color: $darklighten;

			&:hover {
				color: $dark-gray;
			}
		}
	}

	&__contact {
		margin-top: pxToRem(110);

		.whatsapp {
			display: inline-flex;
			align-items: flex-end;
			gap: pxToRem(14);
			margin-bottom: pxToRem(56);
			font-size: pxToRem(14);
			line-height: pxToRem(18);

			&__icon {
				color: $whatsapp;
			}
		}

		.phone {
			display: inline-flex;
			flex-direction: column;
			align-items: flex-start;
			font-size: pxToRem(12);
			line-height: pxToRem(18);
			color: $mild-gray;
		}
	}
}
</style>

<style lang="scss">
.slick-dots {
	.slick-active {
		button {
			background-color: $mild-gray !important;
		}
	}
}
</style>

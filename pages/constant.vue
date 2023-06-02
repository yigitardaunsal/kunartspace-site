<template>
	<div class="constant-page container">
		<div v-if="page.gallery.length" class="constant-page__picture">
			<img :src="page.gallery[0]" :alt="page.title" />
		</div>
		<div class="row">
			<div class="col-md-5">
				<h1 class="constant-page__title">{{ page.title }}</h1>
			</div>
			<div class="col-md-7">
				<div class="constant-page__content" v-html="page.content" />
			</div>
		</div>
		<div class="constant-page__gallery">
			<PageHeadline v-if="isAbout" tag="h2">{{ $t('constantPage.photosFromGallery') }}</PageHeadline>
			<div class="row">
				<div v-for="(image, indx) in page.gallery" :key="indx" class="col-md-4">
					<a :href="image" class="constant-page__gallery-item" @click.prevent="showGallerySlider(indx)">
						<img :src="image" :alt="image" class="img-contain" />
					</a>
				</div>
			</div>
		</div>
		<client-only>
			<vue-easy-lightbox
				esc-disabled
				move-disabled
				:visible="visible"
				:imgs="page.gallery"
				:index="index"
				@hide="hideGallerySlider"
			></vue-easy-lightbox>
		</client-only>
	</div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
	name: 'ConstantPage',
	components: {
		VueEasyLightbox
	},
	async asyncData({ params, $api, store }) {
		const { data } = await $api.get(`/pages/get-detail/${params.slug}`)

		await store.dispatch('i18n/setRouteParams', {
			tr: { slug: data.link },
			en: { slug: data.enLink }
		})

		return {
			page: data
		}
	},
	nuxtI18n: {
		paths: {
			tr: '/:slug',
			en: '/:slug'
		}
	},
	data() {
		return {
			visible: false,
			index: 0
		}
	},
	computed: {
		isAbout() {
			return this.$route.params.slug === 'hakkimizda' || this.$route.params.slug === 'about-us'
		}
	},
	methods: {
		showGallerySlider(index) {
			this.index = index
			this.visible = true
		},
		hideGallerySlider() {
			this.visible = false
		}
	}
}
</script>

<style lang="scss" scoped>
.constant-page {
	&__picture {
		margin-bottom: pxToRem(52);
		width: 100%;
		height: 600px;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__title {
		margin: 0;
		line-height: pxToRem(84);
		font-size: pxToRem(56);
		font-weight: 600;
		color: $darklighten;
	}

	&__content {
		margin-top: pxToRem(18);
		line-height: pxToRem(21);
		font-size: pxToRem(14);
		font-weight: 400;
		color: $dark-gray;
	}

	&__gallery {
		margin: pxToRem(102) 0 pxToRem(60);

		&-item {
			display: block;
			margin-bottom: pxToRem(30);
			width: 100%;
			height: pxToRem(300);
		}
	}
}
</style>

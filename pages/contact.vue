<template>
	<div class="contact container">
		<TabContainer>
			<TabPane :title="$t('contact')">
				<div class="row">
					<div class="col-md-6">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form class="contact__form row" @submit.prevent="handleSubmit(sendMsg)">
								<div class="col-md-6">
									<FormGroup>
										<Textbox
											v-model="contactForm.name"
											type="text"
											name="name"
											:placeholder="$t('contactPage.form.name')"
											:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
										/>
									</FormGroup>
								</div>
								<div class="col-md-6">
									<FormGroup>
										<Textbox
											v-model="contactForm.surname"
											type="text"
											name="surname"
											:placeholder="$t('contactPage.form.surname')"
											:rules="{ required: 'required', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
										/>
									</FormGroup>
								</div>
								<div class="col-md-12">
									<FormGroup>
										<Textbox
											v-model="contactForm.email"
											type="email"
											name="email"
											:placeholder="$t('contactPage.form.email')"
											rules="required|email"
										/>
									</FormGroup>
								</div>
								<div class="col-md-12">
									<FormGroup>
										<Textbox
											v-model="contactForm.phone"
											type="phone"
											name="phone"
											:placeholder="$t('contactPage.form.phone')"
											rules="required"
										/>
									</FormGroup>
								</div>
								<div class="col-md-12">
									<FormGroup>
										<Textarea
											v-model="contactForm.message"
											name="message"
											:placeholder="$t('contactPage.form.message')"
											rows="13"
											rules="required|min:5"
										/>
									</FormGroup>
								</div>
								<div class="col-md-12">
									<Button type="submit" block>{{ $t('send') }}</Button>
								</div>
							</form>
						</ValidationObserver>
					</div>
					<div class="col-md-6">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1593.1387847151982!2d35.329071!3d37.003174!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd9fbae09b89a768b!2sKUN%20Art%20Space%20%2F%20Kuzgun!5e0!3m2!1str!2str!4v1670785904360!5m2!1str!2str"
							width="100%"
							height="100%"
							style="border: 0"
							allowfullscreen=""
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							class="contact__map"
						></iframe>
					</div>
				</div>
			</TabPane>
			<TabPane :title="$t('contactPage.visit')">
				<VisitInfo />
			</TabPane>
			<TabPane :title="$t('contactPage.application')">
				<Application />
			</TabPane>
		</TabContainer>
		<div class="contact__footer">
			<div class="row">
				<div class="col-md-4">
					<div class="contact__box">
						<div class="contact__icon">
							<PhoneSvg width="40" height="40" />
						</div>
						<div class="contact__content">
							<a href="tel:+905353535" class="contact__link --phone">+90 535 35 35</a>
							<a href="tel:+903223233" class="contact__link --phone">+90 322 32 33</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="contact__box">
						<div class="contact__icon">
							<EnvelopeSvg width="40" height="40" />
						</div>
						<div class="contact__content">
							<a href="mailto:info@kunartspace.com" class="contact__link">info@kunartspace.com</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="contact__box">
						<div class="contact__icon">
							<LocationSvg width="40" height="40" />
						</div>
						<div class="contact__content">
							<p class="contact__text">Cemalpaşa Mahallesi 63012 Sokak No:10/A H.Keskin Apt. Zemin Kat Seyhan/ADANA</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<div class="contact__box">
						<div class="contact__icon">
							<InstagramSvg width="40" height="40" />
						</div>
						<div class="contact__content">
							<a href="https://www.instagram.com/kunartspace/" target="_blank" class="contact__link">kunartspace</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="contact__box">
						<div class="contact__icon">
							<FacebookSvg width="40" height="40" />
						</div>
						<div class="contact__content">
							<a href="https://www.facebook.com/kunartspace/" target="_blank" class="contact__link">kunartspace</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="contact__box">
						<div class="contact__icon">
							<TwitterSvg width="40" height="40" />
						</div>
						<div class="contact__content">
							<a href="https://twitter.com/kunartspace" target="_blank" class="contact__link">kunartspace</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PhoneSvg from '@/assets/svg/phone.svg'
import EnvelopeSvg from '@/assets/svg/envelope.svg'
import LocationSvg from '@/assets/svg/location.svg'
import InstagramSvg from '@/assets/svg/instagram.svg'
import FacebookSvg from '@/assets/svg/facebook.svg'
import TwitterSvg from '@/assets/svg/twitter.svg'

export default {
	name: 'ContactPage',
	components: {
		PhoneSvg,
		EnvelopeSvg,
		LocationSvg,
		InstagramSvg,
		FacebookSvg,
		TwitterSvg
	},
	nuxtI18n: {
		paths: {
			tr: '/iletisim',
			en: '/contact'
		}
	},
	data() {
		return {
			contactForm: {
				name: '',
				surname: '',
				email: '',
				phone: '',
				message: ''
			}
		}
	},
	methods: {
		sendMsg() {
			console.log('sent')
		}
	}
}
</script>

<style lang="scss" scoped>
.contact {
	&__footer {
		margin: pxToRem(45) 0 pxToRem(20);

		.row:not(:last-child) {
			margin-bottom: pxToRem(40);
			border-bottom: 1px solid $graylighten;
			padding-bottom: pxToRem(30);
		}
	}

	&__box {
		display: flex;
		align-items: center;
		gap: pxToRem(22);
		margin-bottom: pxToRem(20);

		@include respond-to('x-large') {
			margin-bottom: 0;
		}
	}

	&__content {
		line-height: pxToRem(24);
		font-style: normal;
		color: $dark-gray;

		* {
			margin: 0;
			padding: 0;
		}
	}

	&__link {
		display: inline-block;
		color: inherit;

		&:hover {
			color: initial;
		}

		&.--phone:not(:last-child) {
			margin-right: pxToRem(20);
			border-right: 1px solid $darklighten;
			padding-right: pxToRem(25);
		}
	}

	&__map {
		margin-top: pxToRem(30);
		height: pxToRem(400);
	}

	@include respond-to('x-large') {
		&__footer {
			margin: pxToRem(145) 0 pxToRem(88);

			.row:not(:last-child) {
				padding-bottom: pxToRem(70);
			}
		}

		&__map {
			height: 100%;
			margin-top: 0;
		}
	}
}
</style>

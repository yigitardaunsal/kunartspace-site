<template>
	<div class="application row">
		<div class="col-md-6">
			<h2 class="application__title">{{ $t('contactPage.applicationTitle') }}</h2>
			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="row" @submit.prevent="handleSubmit(sendApplication)">
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="name"
								name="name"
								:placeholder="$t('contactPage.applicationForm.name')"
								:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
							/>
						</FormGroup>
					</div>
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="surname"
								name="surname"
								:placeholder="$t('contactPage.applicationForm.surname')"
								:rules="{ required: 'requied', regex: /^[a-zA-ZığĞüÜşŞiİöÖçÇ\s]*$/ }"
							/>
						</FormGroup>
					</div>
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="email"
								type="email"
								name="email"
								:placeholder="$t('contactPage.applicationForm.email')"
								rules="required|email"
							/>
						</FormGroup>
					</div>
					<div class="col-md-6">
						<FormGroup>
							<Textbox
								v-model="phone"
								type="phone"
								name="phone"
								:placeholder="$t('contactPage.applicationForm.phone')"
								rules="required"
							/>
						</FormGroup>
					</div>
					<div class="col-md-12">
						<FormGroup>
							<Textbox
								v-model="branch"
								name="branch"
								:placeholder="$t('contactPage.applicationForm.branch')"
								rules="required"
							/>
						</FormGroup>
					</div>
					<div class="col-md-12">
						<FormGroup>
							<Textarea
								v-model="about"
								name="about"
								:placeholder="$t('contactPage.applicationForm.about')"
								rows="12"
								rules="required"
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
			<div class="application__picture">
				<img src="images/application.jpg" alt="Artist Application" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ArtistApplication',
	data() {
		return {
			name: '',
			surname: '',
			email: '',
			phone: '',
			branch: '',
			about: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.application {
	&__title {
		margin: 0 0 px2rem(20);
		line-height: px2rem(62);
		font-size: px2rem(42);
		font-weight: 600;
	}

	&__picture {
		width: 100%;
		height: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>

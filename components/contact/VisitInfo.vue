<template>
	<div class="row">
		<div class="col-md-6">
			<div class="visit-info">
				<h1 class="visit-info__title">{{ $t('contactPage.visitTitle') }}</h1>
				<div class="visit-info__contact">
					<span class="visit-info__text --day">{{ $t('monday') }}-{{ $t('saturday') }}</span>
					<span class="visit-info__text --hour">10:00-18:00</span>
					<span class="visit-info__text --day">{{ $t('sunday') }}</span>
					<span class="visit-info__text --hour">12:00-17:00</span>
					<Button type="text" block class="visit-info__button">{{ $t('contactPage.entranceIsFree') }}</Button>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<img src="images/visit.jpg" alt="Visiting Information" class="img-fluid" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'VisitInfo'
}
</script>

<style lang="scss" scoped>
.visit-info {
	display: flex;
	flex-direction: column;
	height: 100%;

	&__title {
		margin: 0 0 pxToRem(100);
		line-height: pxToRem(84);
		font-size: pxToRem(56);
		font-weight: 600;
	}

	&__contact {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	&__text {
		display: block;
		margin-bottom: pxToRem(16);

		&.--day {
			line-height: pxToRem(24);
			font-size: pxToRem(16);
			color: $dark-gray;
		}

		&.--hour {
			line-height: pxToRem(45);
			font-size: pxToRem(30);
			font-weight: 500;
		}
	}

	&__button {
		margin-top: auto;
	}
}
</style>

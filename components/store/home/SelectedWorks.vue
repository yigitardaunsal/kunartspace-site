<template>
	<div class="selected-works">
		<PageHeadline tag="h2" position="center" :bordered="false" size="sm">{{ $t('selectedWorks') }}</PageHeadline>
		<div class="row">
			<div v-for="(work, index) in works" :key="index" class="col-md-4">
				<WorkCard :work="work" />
			</div>
		</div>
	</div>
</template>

<script>
import WorkCard from '@/components/store/home/WorkCard.vue'

export default {
	name: 'SelectedWorks',
	props: {
		works: {
			type: Array,
			required: true
		}
	},
	components: { WorkCard }
}
</script>

<style lang="scss" scoped></style>

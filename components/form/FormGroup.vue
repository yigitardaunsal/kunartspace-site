<template>
	<div class="form-group"><slot /></div>
</template>

<script>
export default {
	name: 'FormGroup'
}
</script>

<style lang="scss" scoped>
.form-group {
	margin-bottom: px2rem(32);
}
</style>

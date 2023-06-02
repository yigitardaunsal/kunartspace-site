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
	margin-bottom: pxToRem(32);
}
</style>

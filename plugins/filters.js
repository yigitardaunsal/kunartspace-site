import Vue from 'vue'

Vue.filter('currency', function (value) {
	const formatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY',
		minimumFractionDigits: 2
	})

	return formatter.format(value).replace('₺', '') + ' TL'
})

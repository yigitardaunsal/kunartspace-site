import { extend, localize } from 'vee-validate/dist/vee-validate.full.esm'
import tr from 'vee-validate/dist/locale/tr.json'

extend('password', {
	validate: (value) => {
		const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
		return re.test(value)
	},
	message: (field) => field + ' alanında en az 1 büyük harf, 1 küçük harf ve 1 özel karakter (@,$,!,%,*,?,&) olmalıdır'
})

localize('tr', tr)

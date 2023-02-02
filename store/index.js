import Cookie from 'js-cookie'

export const state = () => ({
	exhibitionList: [],
	accessToken: null,
	customer: null,
	forgotPasswordEmail: '',
	addresses: [],
	cart: []
})

export const mutations = {
	SET_EXHIBITION_LIST(state, payload) {
		state.exhibitionList = payload
	},
	SET_ACCESS_TOKEN(state, token) {
		state.accessToken = token
	},
	SET_CUSTOMER(state, payload) {
		state.customer = payload
	},
	SET_FORGOT_PASSWORD_EMAIL(state, payload) {
		state.forgotPasswordEmail = payload
	},
	SET_ADDRESSES(state, payload) {
		state.addresses = payload
	}
}

export const actions = {
	nuxtServerInit({ commit }, context) {
		if (process.client || !context.ssrContext.req.headers?.cookie) {
			return
		}

		let token = context.ssrContext.req.headers.cookie.split(';').find((c) => c.trim().startsWith('accessToken='))
		if (token) {
			token = token.split('=')[1]
			commit('SET_ACCESS_TOKEN', token)
			commit('SET_CUSTOMER', token)
			return this.$axios
				.get('/customers/get-info', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then(({ data }) => commit('SET_CUSTOMER', data))
				.catch(() => {
					Cookie.remove('accessToken')
				})
		}
	},
	initAuth({ commit }, req) {
		let token
		if (req) {
			// Working on server side
			if (!req.headers.cookie) {
				return
			}
			token = req.headers.cookie.split(';').find((c) => c.trim().startsWith('accessToken='))
			if (token) {
				token = token.split('=')[1]
			}
		} else {
			// Working on client side
			token = localStorage.getItem('accessToken')
			if (!token) {
				return
			}
		}

		commit('SET_ACCESS_TOKEN', token)
	},
	async fetchExhibitionList({ commit }) {
		this.$axios.setHeader('lang', this.$i18n.locale)
		const data = await this.$axios.$get('exhibitions/get-list')
		const mappedData = data.map((exhibition) => {
			const dates = exhibition.date.split(' - ')
			return {
				...exhibition,
				startDate: this.$moment(dates[0]).locale(this.$i18n.locale).format('DD MMMM'),
				endDate: this.$moment(dates[1]).locale(this.$i18n.locale).format('DD MMMM YYYY')
			}
		})
		commit('SET_EXHIBITION_LIST', mappedData)
	},
	register({ dispatch }, payload) {
		return this.$axios
			.post('/customers/register', payload)
			.then(({ data }) => {
				dispatch('setAuthData', data)
				this.$router.push('/store/customer')
				return 200
			})
			.catch(({ response }) => {
				return response.status
			})
	},
	login({ dispatch }, payload) {
		return this.$axios
			.post('/customers/login', payload)
			.then(({ data }) => {
				dispatch('setAuthData', data)
				let returnUrl = this.$router.currentRoute.query?.returnUrl
				if (!returnUrl) {
					returnUrl = '/store/customer'
				}
				this.$router.push(returnUrl)
				return 200
			})
			.catch(({ response }) => {
				return response.status
			})
	},
	setAuthData({ commit, dispatch }, payload) {
		Cookie.set('accessToken', payload.accessToken, { expires: 1 })
		localStorage.setItem('accessToken', payload.accessToken)
		commit('SET_ACCESS_TOKEN', payload.accessToken)
		delete payload.accessToken
		delete payload.refreshToken
		commit('SET_CUSTOMER', payload)
		dispatch('mergeCart')
	},
	mergeCart({ state }) {
		const cart = JSON.parse(Cookie.get('cart') || '[]')

		if (!cart.length) return

		this.$axios.setHeader('Authorization', `Berar ${state.accessToken}`)
		this.$axios
			.post('/cart/merge', { products: cart })
			.then(() => Cookie.remove('cart'))
			.catch((e) => console.log(e))
	},
	logout({ commit }) {
		Cookie.remove('accessToken')
		localStorage.removeItem('accessToken')

		const locale = this.$i18n.locale
		this.$router.push({ name: `store___${locale}` })

		commit('SET_ACCESS_TOKEN', null)

		setTimeout(() => {
			commit('SET_CUSTOMER', null)
		}, 2000)
	},
	forgotPassword({ state, commit }, email) {
		email = email || state.forgotPasswordEmail

		return this.$axios
			.post('/customers/forgot-password', { email })
			.then(() => {
				commit('SET_FORGOT_PASSWORD_EMAIL', email)
				this.$router.push('/store/customer/verify-and-reset-password')
				return 200
			})
			.catch(({ response }) => response.status)
	},
	verifyAndResetPassword({ state, commit }, payload) {
		payload.email = state.forgotPasswordEmail

		return this.$axios
			.post('/customers/verify-code-and-reset-password', payload)
			.then(() => {
				commit('SET_FORGOT_PASSWORD_EMAIL', '')
				return 200
			})
			.catch(({ response }) => response.status)
	},
	changePassword({ state }, payload) {
		return this.$axios
			.post('/customers/reset-password', payload, {
				headers: {
					Authorization: `Bearer ${state.accessToken}`
				}
			})
			.then(() => 200)
			.catch(({ response }) => response.status)
	},
	fetchAddresses({ state, commit }) {
		return this.$axios
			.get('/customers/get-addresses', {
				headers: {
					Authorization: `Bearer ${state.accessToken}`
				}
			})
			.then(({ data }) => commit('SET_ADDRESSES', data))
			.catch(({ response }) => console.log(response))
	},
	createAddress({ state, dispatch }, payload) {
		return this.$axios
			.post('/customers/add-address', payload, {
				headers: {
					Authorization: `Berar ${state.accessToken}`
				}
			})
			.then(() => {
				dispatch('fetchAddresses')
				return 201
			})
			.catch(({ response }) => response.status)
	},
	updateAddress({ state, dispatch }, payload) {
		const id = payload._id
		delete payload._id

		return this.$axios
			.patch(`/customers/update-address/${id}`, payload, {
				headers: {
					Authorization: `Berar ${state.accessToken}`
				}
			})
			.then(() => {
				dispatch('fetchAddresses')
				return 200
			})
			.catch(({ response }) => response.status)
	},
	deleteAddress({ state, dispatch }, id) {
		return this.$axios
			.delete(`/customers/remove-address/${id}`, {
				headers: {
					Authorization: `Bearer ${state.accessToken}`
				}
			})
			.then(() => {
				dispatch('fetchAddresses')
				return 200
			})
			.catch(({ response }) => response.status)
	},
	addToCart({ state }, payload) {
		if (!state.accessToken) {
			const cart = JSON.parse(Cookie.get('cart') || '[]')
			const productInCart = cart.find((item) => item.productId === payload.productId)

			if (productInCart) {
				return 406
			}

			cart.push({
				productId: payload.productId,
				onModel: payload.onModel
			})
			Cookie.set('cart', JSON.stringify(cart), { expires: 1 })
			return 200
		}

		this.$axios.setHeader('Authorization', `Berar ${state.accessToken}`)
		return this.$axios
			.post('/customers/add-to-cart', payload)
			.then(() => 200)
			.catch(({ response }) => response.status)
	}
}

export const getters = {
	getIsAuthenticated(state) {
		return !!state.accessToken
	},
	getCurrentExhibition(state) {
		return state.exhibitionList.find((exhibition) => exhibition.isCurrent)
	},
	getExhibitionListWithoutCurrent(state) {
		return state.exhibitionList.filter((exhibition) => !exhibition.isCurrent)
	}
}

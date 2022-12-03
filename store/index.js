export const state = () => ({
	exhibitionList: []
})

export const getters = {
	getCurrentExhibition(state) {
		return state.exhibitionList.find((exhibition) => exhibition.isCurrent)
	},
	getExhibitionListWithoutCurrent(state) {
		return state.exhibitionList.filter((exhibition) => !exhibition.isCurrent)
	}
}

export const mutations = {
	SET_EXHIBITION_LIST(state, payload) {
		state.exhibitionList = payload
	}
}

export const actions = {
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
	}
}

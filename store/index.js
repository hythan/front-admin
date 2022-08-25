export const state = () => ({
  token: ''
})

export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  }
}

export const actions = {
  async fetchCounter(state) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}

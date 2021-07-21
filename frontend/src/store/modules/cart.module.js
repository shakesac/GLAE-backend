const state = {
    cartItems: []
}

const mutations = {
    CART_ADD_ITEMS (state, payload) {
      state.cartItems.push(payload)
    }
}

const actions = {
    addCartItem ({ commit }, cartItem) {
      axios.post('/api/cart', cartItem).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    },
    removeCartItem ({ commit }, cartItem) {
      axios.delete('/api/cart/delete', cartItem).then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    },
    removeAllCartItems ({ commit }) {
      axios.delete('/api/cart/delete/all').then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      });
    }
  }
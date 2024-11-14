export const CartReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cartItems: [...state.cartItems, payload.product]
			};
		case 'UPDATE_CART_ITEM':
			return {
				...state,
				cartItems: state.cartItems.map((item) =>
					item.id === payload.product.id ? payload.product : item
				)
			};

		case 'REMOVE_CART_ITEM':
			return {
				...state,
				cartItems: state.cartItems.filter(
					(product) => product.id !== payload.id
				)
			};
		case 'APPLY_COUPON': {
			return {
				...state,
				cartSummary: {
					...state.cartSummary,
					coupon: payload.coupon,
					discount: payload.discount
				}
			};
		}
		case 'UPDATE_QUANTITY':
			return {
				...state,
				totalQuantity: payload
			};
		default:
			return state;
	}
};

import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    amount: 500,
  },
  reducers: {
    addToWallet(state, action) {
      let currentAmount = state.amount + action.payload.amount;
      state.amount = currentAmount;
    },

    deductFromWallet(state, action) {
      let currentAmount = state.amount - action.payload.amount;
      state.amount = currentAmount;
    },
  },
});

export const walletActions = walletSlice.actions;

export default walletSlice;

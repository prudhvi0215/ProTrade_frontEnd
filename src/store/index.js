import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./wallet-slice";
import portfolioSlice from "./portfolio-slice";

// Main Hub of redux
const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    portfolio: portfolioSlice.reducer,
  },
});

export default store;

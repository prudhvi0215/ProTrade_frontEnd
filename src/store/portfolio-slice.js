import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    stocksList: [],
    totalQuantity: 0,
  },
  reducers: {
    addToPortfolio(state, action) {
      const newItem = action.payload;

      const exisitingItem = state.stocksList.find(
        (item) => item.name == newItem.name
      );

      if (!exisitingItem) {
        state.stocksList.push({
          name: newItem.name,
          symbol: newItem.symbol,
          exchange: newItem.exchange,
          buyPrice: newItem.buyPrice,
          sellPrice: newItem.sellPrice,
        });
        state.totalQuantity += 1;
      }
    },

    removeFromPortfolio(state, action) {
      const newItem = action.payload;

      const exisitingItems = state.stocksList.filter((item) => {
        return item.name != newItem.name;
      });

      state.stocksList = exisitingItems;
      state.totalQuantity -= 1;
    },
  },
});

export const portfolioActions = portfolioSlice.actions;

export default portfolioSlice;

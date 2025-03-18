import { configureStore } from '@reduxjs/toolkit'
import dashboardApi from '../features/dashboard/dashboardApi'
import statsRankingApi from '../features/stats/statsRankingApi';
import playerPositionApi from '../features/position/playerPositionApi';
import cartReducer from '../cart/cartSlice'
import userSelectionApi from '../features/user-selection/userSelectionApi';
import adminApi from '../features/admin/adminApi';
import predictionApi from '../features/prediction/predictionApi';


const store = configureStore({
  reducer: {
    cart:cartReducer,
    [dashboardApi.reducerPath]:dashboardApi.reducer,
    [statsRankingApi.reducerPath]:statsRankingApi.reducer,
    [playerPositionApi.reducerPath]:playerPositionApi.reducer,
    [userSelectionApi.reducerPath]:userSelectionApi.reducer,
    [adminApi.reducerPath]:adminApi.reducer,
    [predictionApi.reducerPath]:predictionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      statsRankingApi.middleware,
      playerPositionApi.middleware,
      userSelectionApi.middleware,
      adminApi.middleware,
      predictionApi.middleware
    ),
})

export default store;
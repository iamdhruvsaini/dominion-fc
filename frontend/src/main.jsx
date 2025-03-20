import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import store from './redux/store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { initializeSocket } from './utils/socket'
import ScrollToTop from './utils/ScrollToTop'

initializeSocket();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router}>
      <ScrollToTop /> 
    </RouterProvider>
  </Provider>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import store from './redux/store/store'
import {Provider} from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { initializeSocket } from './utils/socket'

initializeSocket();

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Toaster/>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)

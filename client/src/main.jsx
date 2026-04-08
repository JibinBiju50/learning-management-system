import { createRoot } from 'react-dom/client'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider  router={router}/>
    </AuthProvider>
  </QueryClientProvider>,
)

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { AuthProvider } from "./Context/AuthProvider.jsx"
import store from '../Redux/store'
import { Provider } from 'react-redux';

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={store}> 
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
  </AuthProvider>

)

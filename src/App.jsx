import { useLocation } from 'react-router-dom';
import AppRoutes from "./routes"
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
const isDashboardRoute = location.pathname.startsWith('/dashboard')

function App() {

  return (
    <>
      {!isDashboardRoute && <Header />}
      <AppRoutes />
      {!isDashboardRoute && <Footer />}
    </>
  )
}

export default App

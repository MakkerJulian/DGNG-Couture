import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { PrivateRoutes } from './auth/PrivateRoute'
import { Login } from './pages/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route key={routes[0].name} path={routes[0].path} element={<Login></Login>}></Route>
          {routes.map((route) => (
            <Route key={route.path} element={<PrivateRoutes route={route} />}>
              <Route
                path={route.path}
                element={<route.element />}
              />
            </Route>
          ))}
        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App

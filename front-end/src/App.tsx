import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { PrivateRoutes } from './auth/PrivateRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} element={<PrivateRoutes route={route}/>}>
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

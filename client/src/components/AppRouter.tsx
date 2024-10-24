import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/router';
import { useAppSelector } from '../hooks/redux';

const AppRouter: FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  return (
    <div>
      <Routes>
        {
          isAuthenticated
            ? privateRoutes.map(route =>
              <Route key={route.path} path={route.path} element={<route.component />} />
            )
            : publicRoutes.map(route =>
              <Route key={route.path} path={route.path} element={<route.component />} />
            )
        }
        <Route path={"*"} element={<Navigate to="/main" />} />
      </Routes >
    </div>
  )
}


export default AppRouter;
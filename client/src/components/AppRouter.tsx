import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';
import { privateRoutes, publicRoutes } from '../router/router';

const AppRouter: FC = () => {
   const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
   return (
      <>
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
            <Route path={"*"} element={<Navigate to="/lesson" />} />
         </Routes >
      </>
   )
}


export default AppRouter;
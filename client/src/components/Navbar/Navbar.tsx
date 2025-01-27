import { FC } from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.scss"
import { useAppSelector } from '../../hooks/redux';



const Navbar: FC = () => {
   const { isAuthenticated } = useAppSelector(state => state.auth)
   return (
      <div className='navbar'>
         <Link to={'/lesson'}>Тестування</Link>
         <Link to={'/lesson'}>Практика</Link>
         <Link to={'/auth'}>Auth {String(isAuthenticated)}</Link>

      </div>
   )
}

export default Navbar;
import { FC } from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.scss"


const Navbar: FC = () => {
  return (
    <div className='navbar'>
      <Link to={'/lesson'}>Тестування</Link>
      <Link to={'/lesson'}>Статистика</Link>
      <Link to={'/lesson'}>Практика</Link>
    </div>
  )
}

export default Navbar;
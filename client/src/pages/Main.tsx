import { FC } from 'react';
import { Link } from 'react-router-dom';


const Main: FC = () => {

  return (
    <div className='main'>
      <Link to={"/lesson"}>Продовжити навчання</Link>
      <br />
      <Link to={"/auth"}>Увійти</Link>
    </div>
  );
}

export default Main;
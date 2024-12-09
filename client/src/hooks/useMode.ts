import { useLocation } from 'react-router-dom';

function useMode() {
   const location = useLocation();
   if (location.pathname.startsWith('/playing')) {
      console.log("aisfdjghlaisfdghbvlaidjhgvb")
      return 'dual';
   }
   return "default"

}

export default useMode;

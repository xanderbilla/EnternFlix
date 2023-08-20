import Home from '@/components/Home/Home'
import FrontPage from '@/components/FrontPage/FrontPage'

export default function HomePage() {
  // const user = true;
  const user = false;
  return (
     <>
      {
        !user ? 
        <Home/>
        :
        <FrontPage/>
      }
     </>
    )
}

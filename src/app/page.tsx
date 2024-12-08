import Home from '@/components/Home/Home'
import FrontPage from '@/components/FrontPage/FrontPage'

export default function HomePage() {
  const user = !true;
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

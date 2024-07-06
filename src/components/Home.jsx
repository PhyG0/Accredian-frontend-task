import Hero from './Hero'
import './Home.css'
import Steps from './Steps.jsx'
import Benefits from './Benefits.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Steps />
      <Benefits />
    </div>
  )
}

export default Home

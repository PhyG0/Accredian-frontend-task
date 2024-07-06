import Hero from './Hero'
import './Home.css'
import Steps from './Steps.jsx'
import Benefits from './Benefits.jsx'
import CongratulationsModal from './Congrats.jsx'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Home = () => {
  // Define the username you want to fetch
  const userName = useSelector((state) => state.auth.userName)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const data = { username: userName }

    // Define the fetch request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    // Make the fetch request to your backend endpoint
    fetch(
      `https://accredian-backend-task-9s5f.onrender.com/api/users/${userName}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        if (data.referralRewards.length > 0) {
          setIsModalOpen(true)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="home">
      <CongratulationsModal open={isModalOpen} onClose={handleCloseModal} />
      <Hero />
      <Steps />
      <Benefits />
    </div>
  )
}

export default Home

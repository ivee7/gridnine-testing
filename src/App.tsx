import { useEffect } from 'react'
import { Cards } from './components/Cards/Cards'
import { Layout } from './components/Layout/Layout'
import { Navbar } from './components/Navbar/Navbar'
import { useAppDispatch } from './hooks'
import { initCards } from './store/actions/filter'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initCards())
  }, [])

  return (
    <Layout Navbar={<Navbar/>}>
      <Cards />
    </Layout>
  )
}

export default App

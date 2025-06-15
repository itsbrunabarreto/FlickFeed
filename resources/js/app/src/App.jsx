
import ContextProvider from './context/ContextProvider'
import Rotas from './routes/Routes'

function App() {

  return (
    <>
     <ContextProvider>
        <Rotas/>
     </ContextProvider>
    </>
  )
}

export default App
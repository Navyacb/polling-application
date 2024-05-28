import './App.css'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import Header from './components/header/Header';

function App() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App

import { ChakraProvider } from '@chakra-ui/react'
import Chat from './components/Chat';

function App() {
  return (
    <ChakraProvider>
      <div>
        <Chat />
      </div>
    </ChakraProvider>
  );
}

export default App;

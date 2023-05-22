import { Box, ChakraProvider } from '@chakra-ui/react'
import Chat from './screens/SplashScreen';

function App() {
  return (
    <ChakraProvider>
      <Box>
        <Chat />
      </Box>
    </ChakraProvider>
  );
}

export default App;

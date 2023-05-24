import { Box, ChakraProvider } from '@chakra-ui/react'
import Chat from './screens/SplashScreen';
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <ChakraProvider>
      <Box>
        <Chat />
        <Analytics />
      </Box>
    </ChakraProvider>
  );
}

export default App;

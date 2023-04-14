import { Container, Input , FormControl, IconButton, InputRightElement, InputGroup, Icon, Box, Text, Center, Flex, Stack, Spinner } from "@chakra-ui/react"
import { useState } from "react"
import { BsArrowUpRightCircleFill, BsSun, BsLightningCharge, BsArrowRightShort } from 'react-icons/bs'
import { CiWarning } from 'react-icons/ci'
import axios from 'axios'
import SingleChat from "./SingleChat"

function Chat () {
    const icon = <Icon as={BsArrowUpRightCircleFill} />
    const [searchInput, setSearchInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<any[]>([])

    const getResponse = async () => {
        setIsLoading(true)
        const response = await axios({
            method: "post",
            url: "http://localhost:4000/",
            data: { question: searchInput.slice(1, -1) },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        setIsLoading(false)
        setResponse(response.data.responses)
    }

    return(
        <Container>
        {response.length > 0 ? <SingleChat question={searchInput} answer={response ? response[0]?.message.content : ''} /> :
        <Container>
            <Flex direction={["column", "column", "row"]} alignContent="center" justifyContent="center">
            <Box bg='whiteAlpha.200' paddingTop="40" color="pink">
                <Center>
                    <Text fontWeight="bold" paddingBottom="10" fontSize='5xl' justifyContent="center">ChatGPT</Text>
                </Center>
                <Center>
                <Stack spacing={10} direction={["column", "column", "row"]} paddingBottom="44">
                        <Box>
                            <Center><Icon as={BsSun}/></Center>
                            <Text textAlign="center" pt="2" pb="2">Examples</Text>
                            <Box>
                                <Stack spacing={3}>
                                    <Text onClick={(e) => { setSearchInput(e.currentTarget.textContent?.slice(1, -1) as string) }} _hover={{backgroundColor: "pink.300"}} cursor="pointer" bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">"Explain computing in simple terms"</Text>
                                    <Text onClick={(e) => { setSearchInput(e.currentTarget.textContent?.slice(1, -1) as string) }} _hover={{backgroundColor: "pink.300"}} cursor="pointer" bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">"Got any creative ideas for a 10 year old's birthday?"</Text>
                                    <Text onClick={(e) => { setSearchInput(e.currentTarget.textContent?.slice(1, -1) as string) }} _hover={{backgroundColor: "pink.300"}} cursor="pointer" bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">"How do I make an HTTP request in Javascript?"</Text>
                                </Stack>
                            </Box>
                        </Box>
                        <Box>
                            <Center><Icon as={BsLightningCharge} /></Center>
                            <Text textAlign="center" pt="2" pb="2">Capabilities</Text>
                            <Box>
                                <Stack spacing={3}>
                                    <Text bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">Remembers what user said earlier in the conversation</Text>
                                    <Text bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">Allows user to provide follow up corrections</Text>
                                    <Text bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">Trained to decline inappropriate requests</Text>
                                </Stack>
                            </Box>
                        </Box>
                        <Box>
                            <Center><Icon as={CiWarning} /></Center>
                            <Text textAlign="center" pt="2" pb="2">Limitations</Text>
                            <Box>
                                <Stack spacing={3}>
                                    <Text bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">May occasionally generate incorrect information</Text>
                                    <Text bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">May occasionally produce harmful instructions or biased content</Text>
                                    <Text bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">Limited knowledge of world and events after 2021</Text>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                </Center>
            </Box>
            </Flex>
        </Container>}
            <Box as="footer" bottom="5" position="fixed">
                <FormControl >
                <InputGroup>
                <Input placeholder="What do you want to know?" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} width="2xl" />
                    <InputRightElement>
                        {isLoading ? <Spinner /> : <IconButton 
                            aria-label="Search OpenAI" 
                            colorScheme="pink" icon={icon} 
                            onClick={getResponse}
                            boxSize={9}
                        />}
                    </InputRightElement>
                </InputGroup>
                </FormControl>
            </Box>
        </Container>
    )
}


export default Chat
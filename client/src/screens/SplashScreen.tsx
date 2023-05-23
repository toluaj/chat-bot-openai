import { Container, Icon, Box, Text, Center, Flex, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { BsSun, BsLightningCharge } from 'react-icons/bs'
import { CiWarning } from 'react-icons/ci'
import axios from 'axios'
import SingleChat from "../components/SingleChat"
import ChatSearch from "../components/ChatSearch"
import { TypeAnimation } from "react-type-animation"

export type ChatType = {
    role: 'user' | 'assistant';
    content: string
}

function Chat () {
    const [searchInput, setSearchInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [chat, setChat] = useState<ChatType[]>([])
    const [responses, setResponses] = useState<any[]>([])
    const [error, setError] = useState('')

    const getResponse = async (question?: string) => {
        try {
            setError('')
            setIsLoading(true)
            let messages = chat
            messages.push({ role: 'user', content: question ? question : searchInput })
            setChat(messages)
            const response = await axios({
                method: "post",
                url: "https://chat-bot-openai.onrender.com/",
                data: { chats: chat.slice(0) },
                headers: { 'Content-Type': 'application/json' }
            })
            setIsLoading(false)
            setResponses(response.data?.responses)
            messages.push({ role: 'assistant', content: response.data?.responses[0]?.message.content })
            setChat(messages)
        } catch(err) {
            setIsLoading(false)
            if (axios.isAxiosError(err))  {
                if (err.response?.data === "You have exceeded the rate limit for the hour") {
                    setError('You have reached your request limit for the hour 😔')
                }
            }
          }
    }

    return (
        <Box maxH={'100%'}>
        {isLoading || (responses && responses.length > 0) || error ? 
            <SingleChat chat={chat} isLoading={isLoading} error={error} />
            :
        <Container>
            <Box alignContent={'center'} justifyContent={'center'} display={['none', 'none', 'flex']} color={"gray.600"} marginTop={'1.5'}>
                <TypeAnimation
                    sequence={[
                        'Hi there!',
                        1000,
                        'Please note that you have a limit of 10 requests/hour.',
                        2000,
                        'In the text box, use Shift + Enter to go to the next line.',
                        2000,
                        'Have a great day <3',
                        2000,
                        () => {},
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                />
            </Box>
            <Flex direction={["column", "column", "row"]} alignContent="center" justifyContent="center">
            <Box bg='whiteAlpha.200' paddingTop={["5", "20", "32"]} color="pink">
                <Center>
                    <Text fontWeight="bold" paddingBottom={["3", "5", "10"]} fontSize='5xl' justifyContent="center">ChatGPT</Text>
                </Center>
                <Center>
                <Stack spacing={10} direction={["column", "column", "row"]} paddingBottom="44">
                        <Box>
                            <Center><Icon as={BsSun}/></Center>
                            <Text textAlign="center" pt="2" pb="2">Examples</Text>
                            <Box>
                                <Stack spacing={3}>
                                    <Text onClick={(e) => { setSearchInput(e.currentTarget.textContent?.slice(1, -1) as string) }} _hover={{backgroundColor: "black"}} cursor="pointer" bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">"Explain computing in simple terms"</Text>
                                    <Text onClick={(e) => { setSearchInput(e.currentTarget.textContent?.slice(1, -1) as string) }} _hover={{backgroundColor: "black"}} cursor="pointer" bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">"Got any creative ideas for a 10 year old's birthday?"</Text>
                                    <Text onClick={(e) => { setSearchInput(e.currentTarget.textContent?.slice(1, -1) as string) }} _hover={{backgroundColor: "black"}} cursor="pointer" bg="gray.600" borderRadius={5} fontSize="sm" width="64" px="7" py="2" textAlign="center">"How do I make an HTTP request in Javascript?"</Text>
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
        </Container>
        }
            <ChatSearch question={searchInput} onClick={getResponse} isLoading={isLoading} />
        </Box>
    )
}


export default Chat
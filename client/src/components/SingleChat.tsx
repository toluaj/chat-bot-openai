import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
import { TypeAnimation } from 'react-type-animation'
import './styles.css'

interface SingleChatProps {
   chat: any[],
   isLoading: boolean
}

const SingleChat = ({ chat, isLoading }: SingleChatProps) => {
  return (
        <div style={{ maxHeight: '45em', overflow: 'auto'}}>
        {
            
            chat.map((chat, index) => (
                chat.role === 'user' ? (
                <Box bg="gray.300" padding="4" key={index} height='fit-content' borderRadius={6} border={'.2px black solid'}>
                <HStack>
                    <Avatar name='M E' bg="pink" size="sm"></Avatar>
                    <Text whiteSpace={'pre-wrap'}>{chat.content}</Text>
                </HStack>
                </Box>
                )
                :
            (<Box bg="whitesmoke" padding="4" key={index} height='fit-content' borderRadius={6} border={'.2px black solid'}>
                <HStack>
                    <Avatar name='A I' bg="pink" size="sm"></Avatar>
                    <TypeAnimation
                    style={{ whiteSpace: 'pre-wrap'}}
                    speed={70}
                    cursor={false}
                    sequence={[
                        `${chat.content}`,
                        () => {},
                    ]}
            />
                </HStack>
            </Box>
            )
            ))

        }
        {isLoading ? <Box bg="whitesmoke" padding="4" height='fit-content' border={'.5px black solid'}>
            <HStack>
                <Avatar name='A I' bg="pink" size="sm"></Avatar>
                <TypeAnimation
                    className='custom-type-animation-cursor'
                    cursor={false}
                    sequence={[
                        1000,
                        () => {},
                    ]}
            />
            </HStack>
        </Box> : ''}
        </div>
        )
    }
    export default SingleChat
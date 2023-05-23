import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
import { TypeAnimation } from 'react-type-animation'
import { ChatType } from '../screens/SplashScreen'
import './styles.css'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { MdHourglassFull } from 'react-icons/md'

interface SingleChatProps {
   chat: ChatType[],
   isLoading: boolean,
   error: string;
}

const SingleChat = ({ chat, isLoading, error }: SingleChatProps) => {
    useEffect(() => {
        if (error) toast.error(error, { duration: 5000, icon: <MdHourglassFull size={25} /> })
    },[error])

  return (
    <Box id="scroller" maxH={[ 'calc(100vh - 80px)']} overflow={'auto'} paddingTop={5} paddingLeft={['1em', '1em', '5em', '10em', '25em']} paddingRight={['1em', '1em', '5em', '10em', '25em']}>
        <Toaster position='top-right' />
        {chat.map((chat, index) => (
            chat.role === 'user' ? (
            <Box bg="gray.300" padding="4" mb={2} key={index} paddingLeft={['3', '5', '10']} height='fit-content' borderRadius={30} border={'.2px gray.100 solid'}>
            <HStack flex={1} flexDirection={['row', 'row-reverse']}>
                <Avatar name='M E' bg="pink" size="sm" ml={1}></Avatar>
                <Text whiteSpace={'pre-wrap'} ml={1}>{chat.content}</Text>
            </HStack>
            </Box>
            )
            :
            (
            <Box bg="whitesmoke" padding="4" mb={1} key={index} paddingLeft={['3', '5', '10']} height='fit-content' borderRadius={30} border={'.2px gray.100 solid'}>
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
            ))}
        {isLoading ? 
        <Box bg="whitesmoke" padding="4" paddingLeft={['3', '5', '10']} borderRadius={20} height='fit-content'>
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
        </Box> : 
        ''}
        <Box id="anchor"></Box>
        </Box>
        )
    }
    export default SingleChat
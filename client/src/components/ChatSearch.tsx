import { Box, Flex, FormControl, Icon, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import { AutoResizeTextarea } from '../AutoSizeTextArea';

interface ChatSearchProps {
    question?: string;
    onClick(searchInput: string): Promise<void>;
    isLoading: boolean;
}

export type SearchInputType = {
    question: string
}

const ChatSearch = ({ question, onClick, isLoading }: ChatSearchProps) => {
    const icon = <Icon as={BsArrowUpRightCircleFill} />

    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (question) setSearchInput(question as string)
    }, [question])

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault()
        onClick(searchInput)
        setSearchInput('')
    }

  return (
    <Flex alignContent={'center'} alignSelf={'center'} justifyContent={'center'}>
        <Box as="footer" bottom="5" position="fixed">
            <FormControl>
            <InputGroup>
                <AutoResizeTextarea 
                    value={searchInput} 
                    width={["72", "2xl", "2xl"]} 
                    backgroundColor={'white'}
                    _focus={{ border: 'none' }}
                    placeholder="What do you want to know?" 
                    onKeyPress={(e) => { (e.key === 'Enter' && !e.shiftKey) && handleSearch(e) }} 
                    onChange={(e) => setSearchInput(e.target.value)} 
                />
                <InputRightElement>
                    <IconButton 
                        aria-label="Search OpenAI" 
                        colorScheme="pink" icon={icon} 
                        onClick={handleSearch}
                        boxSize={10}
                        as="footer" bottom="5" position="fixed"
                        isDisabled={searchInput.length === 0 || searchInput.trim() === '' || isLoading}
                    />
                </InputRightElement>
            </InputGroup>
            </FormControl>
        </Box>   
    </Flex>
  )
}

export default ChatSearch
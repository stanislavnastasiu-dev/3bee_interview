import { Box, Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface StatProps {
  mainText: string;
  secondaryText: string;
  variant: 'orange' | 'pink' | 'white';
}

const Stat: React.FC<StatProps> = ({ variant, mainText, secondaryText }) => {
  return (
    <Box bgColor={`${variant}.400`} borderRadius={'full'}>
      <VStack textAlign={'center'} spacing={0}>
        <Text
          fontSize={'xs'}
          color={variant !== 'white' ? 'whiteAlpha.900' : 'blackAlpha.900'}
        >
          {secondaryText}
        </Text>
        <Text
          fontSize={'sm'}
          color={variant !== 'white' ? 'whiteAlpha.900' : 'blackAlpha.900'}
        >
          {mainText}
        </Text>
      </VStack>
    </Box>
  );
};
export default Stat;

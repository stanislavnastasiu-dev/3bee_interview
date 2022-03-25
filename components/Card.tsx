import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

type CardProps = BoxProps & {};

const Card: React.FC<CardProps> = ({ children, borderRadius: _, ...rest }) => {
  return (
    <Box borderRadius={'lg'} {...rest}>
      {children}
    </Box>
  );
};
export default Card;

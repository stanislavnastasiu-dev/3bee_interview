import { StarIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { HiPlay, HiShoppingCart } from 'react-icons/hi';
import { HiveType } from '../types/HiveType';
import Card from './Card';
import Stat from './Stat';

interface ShopCardProps {
  hive: HiveType;
  debug?: boolean;
  addToCart(hiveId: number): void;
}

const ShopCard: React.FC<ShopCardProps> = ({
  hive,
  addToCart,
  debug = true,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState(
    hive.videos.length > 0 ? hive.videos[0].url_video : ''
  );

  return (
    <Card h='65vh' w='20vw' overflow={'hidden'}>
      <Avatar
        src={hive.image_profile}
        position={'absolute'}
        ml={250}
        mt={-3}
        size={'xl'}
        bg={'transparent'}
        zIndex={1}
      />
      <IconButton
        position={'absolute'}
        ml={2}
        mt={2}
        borderRadius={'full'}
        hidden={hive.videos.length === 0}
        icon={<HiPlay />}
        onClick={() => setShowVideo(!showVideo)}
        aria-label={'play-video'}
        zIndex={1}
      />
      {showVideo && (
        <Fragment>
          {/* TODO: gestire video multipli */}
          {/* <SimpleGrid zIndex={1} columns={1} columnGap={10}>
            {hive.videos.map((vid, i) => (
              <IconButton
                aria-label={vid.description_video}
                key={i}
                position={'absolute'}
                ml={2}
                mt={2}
                borderRadius={'full'}
                icon={<HiPlay />}
                onClick={() => setVideoSrc(vid.url_video)}
                zIndex={1}
              />
            ))}
          </SimpleGrid> */}
          <AspectRatio minW='auto' minH={'full'}>
            <video preload='true' autoPlay>
              <source src={videoSrc} />
            </video>
          </AspectRatio>
        </Fragment>
      )}
      {!showVideo && (
        <Fragment>
          <Image
            src={
              debug
                ? 'https://images.unsplash.com/photo-1568526381923-caf3fd520382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
                : hive.main_image
            }
            objectFit='cover'
            alt={hive.name}
          />
          <Center>
            <Avatar
              src={hive.main_image}
              position={'absolute'}
              mb={30}
              size='xl'
              showBorder
              borderColor='whiteAlpha.900'
              borderWidth={'thick'}
            />
          </Center>
          <Box bgColor={'whiteAlpha.900'} h='full'>
            <Center pt={10} pb={2}>
              <VStack>
                <Text fontSize='lg' fontWeight={'bold'}>
                  ALVEARE {hive.name.toUpperCase()}
                </Text>
                <Text fontSize={'sm'} fontWeight={'black'} color={'brand.900'}>
                  {hive.owner_name}, {hive.geo_info[0].region}
                </Text>
                <Box display='flex' mt='2' alignItems='center'>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon
                        boxSize={'10px'}
                        key={i}
                        color={i < hive.ranking ? 'brand.900' : 'gray.300'}
                      />
                    ))}
                </Box>
              </VStack>
            </Center>
            <SimpleGrid columns={2} spacing={2} px={4}>
              <Stat
                mainText={hive.queen_name}
                secondaryText={'Nome regina'}
                variant={'white'}
              />
              <Stat
                mainText={hive.honey.tot_quantity.toFixed(0)}
                secondaryText={'Api protette'}
                variant={'white'}
              />
              <Stat
                mainText={hive.description}
                secondaryText={'Caratteristica'}
                variant={'orange'}
              />
              <Stat
                mainText={hive.honey.consistency}
                secondaryText={'Consistenza'}
                variant={'orange'}
              />
              <Stat
                mainText={hive.honey.smell}
                secondaryText={'Odore'}
                variant={'pink'}
              />
              <Stat
                mainText={hive.honey.taste}
                secondaryText={'Gusto'}
                variant={'pink'}
              />
            </SimpleGrid>
            <HStack p={'4'}>
              <Stack direction={'column'}>
                <Text
                  fontSize={'xl'}
                  fontWeight='bold'
                  as={'s'}
                  color={'gray.400'}
                >
                  {hive.plans[0].price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </Text>
                <Text fontSize={'3xl'} fontWeight='bold' color={'brand.900'}>
                  {hive.plans[0].discounted_price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </Text>
              </Stack>
              <Spacer />
              <Stack direction={'column'}>
                <Button
                  colorScheme='orange'
                  aria-label={'add-to-cart'}
                  rightIcon={<HiShoppingCart />}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    bg: 'orange.100',
                    borderColor: 'orange.400',
                    borderWidth: '2px',
                    color: 'orange.400',
                  }}
                  onClick={() => {
                    addToCart(hive.id);
                  }}
                >
                  Aggiungi
                </Button>
                <Text fontSize={'xs'}>
                  Spedizione{' '}
                  <b>
                    {new Date(
                      Date.parse(hive.honey.shipping_dates)
                    ).toLocaleString('it-IT', {
                      month: 'long',
                      day: '2-digit',
                    })}
                  </b>
                </Text>
              </Stack>
            </HStack>
          </Box>
        </Fragment>
      )}
    </Card>
  );
};
export default ShopCard;

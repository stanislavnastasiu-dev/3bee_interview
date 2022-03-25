import { SimpleGrid, useBreakpointValue, useToast } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ShopCard from '../components/ShopCard';
import { HiveType } from '../types/HiveType';

const URL =
  'https://wnk07eo5oc.execute-api.eu-central-1.amazonaws.com/dev/v2/hives';

const getHivesAsync = async (limit: number, page: number) => {
  const realLimit = Math.min(limit, 10);

  let data: Array<HiveType> = [];

  const result = await fetch(`${URL}?limit=${realLimit}&page=${page}`);

  if (result.ok) {
    data = await result.json();
  }

  return data;
};

const Home: NextPage = () => {
  const [hives, setHives] = useState<Array<HiveType>>([]);

  useEffect(() => {
    const getHives = async () => {
      const result = await getHivesAsync(3, 1);
      setHives(result);
    };

    getHives();
  }, []);

  const addToCart = async (hiveId: number) => {
    const result = await fetch(`${URL}/cart`, {
      method: 'POST',
      body: JSON.stringify({
        user: 1,
        hiveId,
      }),
    });

    if (result.ok) {
      console.log('OK');
    }
  };

  return (
    <SimpleGrid columns={3} spacing={10} p={10} bg={'gray.200'}>
      {hives.map((hive) => (
        <ShopCard key={hive.id} hive={hive} addToCart={addToCart} />
      ))}
    </SimpleGrid>
  );
};

export default Home;

// import Image from 'next/image';
import { HiOutlinePhoto } from 'react-icons/hi2';

import { Box, Flex } from '@mantine/core';

export default function HeroImage() {
  return (
    <Box w="100%" h="50vh" bg="gray.8" pos="relative" mb="md">
      <Flex justify="center" align="center" w="100%" h="100%">
        <HiOutlinePhoto style={{ fontSize: 100 }} />
      </Flex>
    </Box>
  );
}

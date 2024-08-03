"use client";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Firestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { useEffect } from 'react';
import {firestore} from '../firebase';
const item=[
  'tomato',
  'potato',
  'onion',
  'garlic',
  'ginger',
  'carrot',
  'lettuce',
  'cucumber',
]
export default function Home() {
  useEffect(() => {
    const snapshot=query(collection(firebase, 'pantry'))
  },[])
  return (
  <Box 
  width="100vw" 
  height="100vh" 
  display={'flex'}
  justifyContent={'center'}
  alignItems={'center'}
  flexDirection={'column'}
  
  >
    <Box border={'1px solid #333'}>
    <Box width="800px" height="100px" bgcolor={'#ADD8E6'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
      Pantry Items
    </Typography>
    </Box>
    <Stack width="800px" height="300px" spacing={2} overflow={'auto'} >
      {item.map((i)=>(
        <Box 
        key={i}
        width="100%"
        height="300px"
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={'#f0f0f0'}
        >
          <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
            {
              i.charAt(0).toUpperCase() + i.slice(1)
            }
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
  </Box>
  )
}

"use client";
import { Typography, Button , Modal, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Firestore } from 'firebase/firestore';
import { collection,getDocs,query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {firestore} from '../firebase';
export default function Home() {
  const [pantry, setPantry]=useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName]=useState('')
  useEffect(() => {
    const updatePantry = async () => {
    const snapshot=query(collection(firestore, 'pantry'))
    const docs= await getDocs(snapshot)
    const pantryList=[]
    docs.forEach((doc) =>{
      pantryList.push(doc.id)
    })
    console.log(pantryList)
    setPantry(pantryList)
    }
    updatePantry()
  },[])
  const addItem=(item) => {
    console.log(item)
  }
  return (
  <Box 
  width="100vw" 
  height="100vh" 
  display={'flex'}
  justifyContent={'center'}
  alignItems={'center'}
  flexDirection={'column'}
  gap={2}
  >
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
          <TextField id="outlined-basic" label="Item" variant="outlined" fullWidth />
          <Button variant="outlined">Add</Button>
          </Stack>
        </Box>
      </Modal> 
    <Button variant="contained" onClick={handleOpen}>Add</Button>
    <Box border={'1px solid #333'}>
    <Box width="800px" height="100px" bgcolor={'#ADD8E6'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
      Pantry Items
    </Typography>
    </Box>
    <Stack width="800px" height="300px" spacing={2} overflow={'auto'} >
      {pantry.map((i)=>(
        <Box 
        key={i}
        width="100%"
        minHeight="150px"
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

"use client";
import { Typography, Button, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [fullPantry, setFullPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSearchQuery('');
    setPantry(fullPantry); // Reset to the full list
    setOpen(false);
  };

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setFullPantry(pantryList); // Save the full list
    setPantry(pantryList);     // Display the full list initially
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  };

  const handleSearch = () => {
    const filteredItems = fullPantry.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPantry(filteredItems);
  };

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
            <TextField 
              id="outlined-basic" 
              label="Item" 
              variant="outlined" 
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button 
              variant="contained" 
              color='success'
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal> 

      <Box border={'1px solid #333'}>
        <Box 
          width="800px" 
          height="100px" 
          bgcolor={'#ADD8E6'} 
          display={'flex'} 
          justifyContent={'center'} 
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            PANTRY ITEMS
          </Typography>
        </Box>

        <Stack width="800px" direction="row" spacing={2} mb={2}>
          <TextField
            label="Search Item"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>

        <Stack width="800px" height="500px" spacing={2} overflow={'auto'}>
          {pantry.map((item) => (
            <Box 
              key={item.name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>
              <Typography variant={'h5'} color={'#333'} textAlign={'center'}>
                Quantity: {item.count}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button 
                  variant='contained' 
                  color='primary' 
                  onClick={() => addItem(item.name)}
                >
                  +
                </Button>
                <Button 
                  variant='contained' 
                  color='error' 
                  onClick={() => removeItem(item.name)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      <Button variant="contained" color='success' onClick={handleOpen}>
        Add Item
      </Button>
    </Box>
  );
}

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, Avatar, Typography, Button, TextField } from '@mui/material';
import { UserContext } from "../../Contexts/userContext"; // Import the UserContext

const UserProfileDrawer = ({ open, toggleDrawer }) => {
  
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext); // Access userInfo from context
  console.log(userInfo);
  // Initialize state for image upload and address
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // For displaying the uploaded image locally
    }
  };

  const handleLogin = () => {
    navigate("/login");
  }

  // Handle address change
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div>
      {/* Drawer component */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div style={{ width: 250, padding: '20px' }}>
          {/* Check if userInfo exists, otherwise show Login/Signup */}
          {userInfo ? (
            <div>
              {/* User profile section */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar 
                  alt={userInfo.name} 
                  src={image || userInfo.avatarUrl || 'https://www.w3schools.com/w3images/avatar3.png'} 
                  sx={{ width: 80, height: 80, marginBottom: 2 }} 
                />
                <Typography variant="h6">{userInfo.name}</Typography>
                <Typography variant="body2" color="textSecondary">{userInfo.email}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Purchased Items: {userInfo.purchasedItems?.length || 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">Support: {userInfo.support?.length || 'N/A'}</Typography>
              </div>

              <Divider sx={{ margin: '20px 0' }} />

              {/* Upload image section */}
              <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>
              </div>

              {/* Home address section */}
              <TextField
                label="Home Address"
                fullWidth
                value={address}
                onChange={handleAddressChange}
                variant="outlined"
                margin="normal"
              />

              <Divider sx={{ margin: '20px 0' }} />

              {/* List of other possible user actions */}
              <List>
                <ListItem button>
                  <ListItemText primary="Account Settings" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </div>
          ) : (
            // Show Login/Signup if userInfo is not available
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6">Please Log in to view your profile</Typography>
              <Button variant="contained" onClick={() => handleLogin()}>
                Login / Sign Up
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );

};

export default UserProfileDrawer;

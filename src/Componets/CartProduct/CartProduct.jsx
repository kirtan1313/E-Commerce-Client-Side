import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';

function CartProduct() {
    const [cartItems, setCartItems] = useState([]);

    // Fetching the cart products from the API
    useEffect(() => {
        axios
            .get('http://localhost:3005/cartPro')
            .then((response) => {
                console.log('API Response:', response.data || []);
                setCartItems(response.data || []);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Remove a product from the cart
    const handleRemove = (_id) => {
        setCartItems(cartItems.filter(item => item._id !== _id));
    };

    // Adjust product quantity
    const handleQuantityChange = (_id, increment) => {
        setCartItems(cartItems.map(item =>
            item._id === _id
                ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                : item
        ));
    };

    // Calculate total price of the cart
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Your Cart
            </Typography>

            {/* Show empty cart message */}
            {cartItems.length === 0 ? (
                <Typography variant="h6">Your cart is empty.</Typography>
            ) : (
                <>
                    {/* Render each product in the cart */}
                    {cartItems.map((item) => {
                        console.log('cartdata',cartItems);
                        
                        return (
                            <Box
                                key={item._id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderBottom: '1px solid #ccc',
                                    marginBottom: '10px',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img
                                        src={item.img}
                                        alt={item.productName}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="h6">{item.productName}</Typography>
                                        <Typography variant="body2">Price: ${item.price}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleQuantityChange(item._id, -1)}
                                    >
                                        -
                                    </Button>
                                    <Typography>{item.quantity}</Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleQuantityChange(item._id, 1)}
                                    >
                                        +
                                    </Button>
                                </Box>

                                <IconButton onClick={() => handleRemove(item._id)}>
                                    <Delete color="error" />
                                </IconButton>
                            </Box>
                        )
                    })}

                    {/* Display the total price */}
                    <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
                        <Typography variant="h6">Total: ${calculateTotal()}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '10px' }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default CartProduct;

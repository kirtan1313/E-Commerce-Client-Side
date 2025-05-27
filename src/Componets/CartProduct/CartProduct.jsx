import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { useLocation } from 'react-router';

function CartProduct() {
    const [cartItems, setCartItems] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const location = useLocation();

    // Fetch cart products from the API
    useEffect(() => {
        axios.get('http://localhost:3005/cartPro')
            .then((response) => {
                setCartItems(response.data[0]?.products || []);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, [refresh]);

    useEffect(() => {
        if (location.state && location.state.updatedProduct) {
            const updatedProduct = location.state.updatedProduct;

            setCartItems((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id
                        ? { ...product, ...updatedProduct }
                        : product
                )
            );
        }
    }, [location.state]);




    const handleRemove = (_id) => {

        axios.delete(`http://localhost:3005/cartPro/${_id}`)
            .then((response) => {
                setCartItems((prevItems) =>
                    prevItems.filter((items) => items._id !== _id)
                )
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });

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
                        const imageUrl = `http://localhost:3005/${item.img}`;
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
                                        src={imageUrl || 'https://via.placeholder.com/80'}

                                        alt={item.productName || 'Product'}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            // objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="h6">{item.productName || 'No Name'}</Typography>
                                        <Typography variant="body2">Price: ${item.price || 0}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleQuantityChange(item._id, -1)}
                                    >
                                        -
                                    </Button>
                                    <Typography>{item.quantity || 1}</Typography>
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

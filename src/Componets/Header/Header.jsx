import { AppBar, Box, Button, List, ListItem, TextField, Toolbar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/imags/logo.png';
import { CiHeart, CiSearch, CiShoppingCart } from 'react-icons/ci';
import CloseIcon from '@mui/icons-material/Close';
import OffCanvas from '../OffCanvas/OffCanvas';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');
    const [searchQuery, setSearchQuery] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [cartlenght, setCartlenght] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3005/cartPro')
            .then((response) => {
                console.log('API Response:', response.data[0]?.products);
                setCartlenght(response.data[0]?.products || []);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, [refresh]);


    const handleSearchNavigate = () => {
        const normalizedQuery = searchQuery.toLowerCase();

        if (normalizedQuery.includes("men")) {
            navigate('/mens');
        } else if (normalizedQuery.includes("kids")) {
            // Navigate to women's page
            navigate('/kids');
            console.log('Navigating to Women\'s page');
        } else if (normalizedQuery.includes("women")) {

            navigate('/womens');
        } else {
            alert('No matching category found!');
        }
        setShowSearch(false);
    };



    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
    };

    const handleSetActive = (item, path) => {
        setActiveItem(item);
        navigate(path)
    };
    const menuItems = [
        { name: 'Home', path: '/' },
        { name: "Men's", path: '/mens' },
        { name: "Women's", path: '/womens' },
        { name: "Kid's", path: '/kids' },
        // { name: 'Shop', path: '/shop' },
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set to true if token exists

        // Listen for login/logout events
        const handleAuthChange = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        window.addEventListener("authChange", handleAuthChange);
        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the token
        window.dispatchEvent(new Event("authChange")); // Notify listeners
        navigate("/login"); // Redirect to login page
    };

    return (
        <>

            {/* Header */}
            <AppBar sx={{ bgcolor: 'white', zIndex: showSearch ? 999 : 'auto', padding: { xs: '8px 0' }, position: 'unset' }}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: '10px',
                    }}
                >
                    {/* Logo Section */}
                    <Box sx={{ color: 'black' }}>
                        <img src={logo} alt="logo-img" />
                    </Box>


                    {/* Offcanva Button */}
                    <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'relative', }}>
                        <OffCanvas />
                    </Box>


                    {/* Navigation Menu */}
                    <Box sx={{ color: 'black', display: { xs: 'none', md: 'block' } }}>
                        <List sx={{ display: 'flex', gap: 2 }}>
                            {menuItems.map(({ name, path }) => (
                                <ListItem
                                    key={name}
                                    onClick={() => handleSetActive(name, path)}
                                    sx={{
                                        fontSize: '16px',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        listStyle: 'none',
                                        padding: '0 10px',
                                        ':hover::after': {
                                            width: '100%',
                                        },
                                        '::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: activeItem === name ? '100%' : '0',
                                            height: '2px',
                                            backgroundColor: 'red',
                                            transition: 'width 0.3s ease',
                                            overflow: 'hidden',
                                        },
                                    }}
                                >
                                    {name}
                                </ListItem>
                            ))}
                        </List>

                    </Box>

                    {/* Icons Section */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2, cursor: 'pointer' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {isLoggedIn ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleLogout}
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 4,
                                        paddingX: 3,
                                        backgroundColor: "#ff4d4d",
                                        "&:hover": {
                                            backgroundColor: "#ff3333",
                                        },
                                    }}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Link to="/login" style={{ textDecoration: "none" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: 4,
                                            paddingX: 3,
                                            backgroundColor: "#007bff",
                                            "&:hover": {
                                                backgroundColor: "#0056b3",
                                            },
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '25px',
                                color: 'black',
                                fontWeight: 700,
                            }}
                            onClick={toggleSearch}
                        >
                            <CiSearch />
                        </Box>
                        <Box sx={{ fontSize: '25px', position: 'relative', color: 'black', fontWeight: 700 }} onClick={() => navigate('/wishlist')}>
                            <CiHeart />
                            <Box sx={{
                                position: 'absolute',
                                bgcolor: 'black',
                                color: 'white',
                                fontSize: '11px',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: '-7px',
                                left: '15px'
                            }}>

                                2
                            </Box>
                        </Box>
                        <Box sx={{ fontSize: '25px', position: 'relative', color: 'black', fontWeight: 700 }} onClick={() => navigate('/CartProduct')}>
                            <CiShoppingCart />
                            <Box sx={{
                                position: 'absolute',
                                bgcolor: 'black',
                                color: 'white',
                                fontSize: '11px',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: '-7px',
                                left: '15px'
                            }}>

                                {cartlenght.length}
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Search Overlay */}
            {showSearch && (
                <Box sx={{ position: 'fixed', top: '10px', left: 0, width: '100%', bgcolor: 'white', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
                    {/* Search Input */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            style: { fontSize: '16px' },
                        }}
                    />

                    {/* Search Button */}
                    <Button onClick={handleSearchNavigate} sx={{ ml: 2 }}>
                        Search
                    </Button>

                    {/* Close Button */}
                    <IconButton sx={{ ml: 2, bgcolor: 'transparent', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }} onClick={toggleSearch}>
                        <CloseIcon sx={{ color: 'black', fontSize: 30 }} />
                    </IconButton>
                </Box>
            )}
        </>
    );
}

export default Header;

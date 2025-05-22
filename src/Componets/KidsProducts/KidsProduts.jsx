import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { BiShowAlt } from "react-icons/bi";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import axios from "axios";
import Footer from "../Footer/Footer";




const MensProducts = () => {

  const [showAllProducts, setShowAllProducts] = useState([]);



  const categoryMensProducts = showAllProducts.filter(
    filterPro => filterPro.category.toLowerCase() === 'kids'
  )

  useEffect(() => {

    axios.get(`http://localhost:3005/products`)
      .then((res) => {
        setShowAllProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);


  return (
    <Box
      sx={{
        padding: 3,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        paddingTop: "68px",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Kid's Products
      </Typography>

      <Box sx={{paddingBottom:'50px'}}>
        {categoryMensProducts.length === 0 ?
          <Typography sx={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
            No products available in Kid's category.
          </Typography>
          : <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {categoryMensProducts.map((data) => {
              const imageUrl = `http://localhost:3005/${data.img}`;
              return (
                <Box
                  key={data._id}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover .icon-container': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  {/* Product Image */}
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={data.productName}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        opacity: '0.6'
                      }
                    }}
                  />

                  {/* "New" Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      bgcolor: '#aed581',
                      color: 'white',
                      padding: '5px 10px',
                      fontSize: { xs: '10px', md: '12px' },
                      borderRadius: '4px',
                    }}
                  >
                    New
                  </Box>

                  {/* Hover Icons */}
                  <Box
                    className="icon-container"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                      position: 'absolute',
                      bottom: { xs: '35%', sm: '31%', md: '32%', lg: '29%' },
                      left: { xs: '23px', sm: '50px', md: '34px', lg: '54px' },
                      transform: 'translateY(50%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease, transform 0.5s ease',
                    }}
                  >
                    {[<BiShowAlt />, <FaRegHeart />, <LuShoppingCart />].map((Icon, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          bgcolor: 'white',
                          width: { xs: '30px', md: '40px' },
                          height: { xs: '30px', md: '40px' },
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: { xs: '14px', md: '18px' },
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease, background-color 0.3s ease',
                          ':hover': {
                            bgcolor: 'red',
                            color: 'white',
                            transform: 'rotate(360deg)'
                          },
                        }}
                      >
                        {Icon}
                      </Typography>
                    ))}
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ textAlign: 'center', paddingTop: '10px' }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', sm: '14px', md: '16px' },
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    >
                      {data.productName}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 0.5,
                        paddingTop: '5px',
                        fontSize: { xs: '10px', md: '12px' },
                        color: '#ff8a65',
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', md: '16px' },
                        fontWeight: 'bold',
                        color: '#000',
                        paddingTop: '5px',
                      }}
                    >
                      ${data.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
        }
      </Box>

         <Footer />
    </Box>
  );
};

export default MensProducts;

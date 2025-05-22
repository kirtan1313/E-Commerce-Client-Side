import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const allProducts = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: "$20",
    category: "Men",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Women's Dress",
    price: "$35",
    category: "Women",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Kids' Shoes",
    price: "$30",
    category: "Kids",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Men's Jacket",
    price: "$50",
    category: "Men",
    image: "https://via.placeholder.com/150",
  },
];

const Shop = () => {
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
        Shop All Products
      </Typography>
      <Grid container spacing={3}>
        {allProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Category: {product.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop;

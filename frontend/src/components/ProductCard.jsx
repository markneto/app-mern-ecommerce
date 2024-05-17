import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";


const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const ProductCard = (props) => {
  const { product, getProduct } = props;
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate("/update/" + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/products/delete/${id}`);
      console.log(response.data);
      if (response.data === "Product deleted!") {
        getProduct();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.thumbnail}
        alt={product.title}
        className="product-image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {product.stock}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {product.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Brand: {product.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" gap={2}>
          <Button color="primary" variant="contained" onClick={() => handleUpdate(product._id)}>
            Update
          </Button>
          <Button color="error" variant="contained" onClick={() => handleDelete(product._id)}>
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

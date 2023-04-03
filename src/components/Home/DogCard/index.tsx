import React from "react";
import { Dog } from "../../../types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

// Define the prop types for the DogCard component
interface DogCardProps {
  dog: Dog;
  onToggleFavorite: (dog: Dog) => void;
  isFavorited: boolean;
}

// DogCard component displays dog information and a button to toggle the dog as a favorite
const DogCard: React.FC<DogCardProps> = ({
  dog,
  onToggleFavorite,
  isFavorited,
}) => {
  return (
    // Use Material-UI Card component to create a container for the dog information
    <Card>
      {/* Use CardMedia component to display the dog's image */}
      <CardMedia
        component="img"
        height="500"
        image={dog.img}
        alt={`Image of ${dog.name}`}
      />
      {/* Use CardContent component to display the dog's information */}
      <CardContent>
        {/* Display dog's name using Typography component */}
        <Typography variant="h5">{dog.name}</Typography>
        {/* Display dog's breed */}
        <Typography variant="body2" color="text.secondary">
          Breed: {dog.breed}
        </Typography>
        {/* Display dog's age */}
        <Typography variant="body2" color="text.secondary">
          Age: {dog.age}
        </Typography>
        {/* Display dog's zip code */}
        <Typography variant="body2" color="text.secondary">
          Zip Code: {dog.zip_code}
        </Typography>
      </CardContent>
      {/* Use IconButton component to create a toggle button for marking the dog as a favorite */}
      <IconButton onClick={() => onToggleFavorite(dog)}>
        {/* Use ternary operator to determine which icon to display based on the isFavorited prop */}
        {isFavorited ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default DogCard;

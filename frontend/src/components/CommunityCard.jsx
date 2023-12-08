import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";

const CommunityCard = ({ data }) => {
  return (
    <Card
      sx={{
        width: "455px",
        backgroundColor: "#F2FFE9",
        border: "1px solid #4F6F52",
      }}
    >
      <CardContent>
        <Typography variant='h3' fontSize='28px' gutterBottom>
          {data["cropname"]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {data["email"]}
        </Typography>
        <Typography variant='h6' marginBottom='15px' fontSize='16px'>
          🌱 Ideal soil conditions in {data["city"]}, {data["state"]},{" "}
          {data["country"]}
        </Typography>
        <Typography variant='h6' gutterBottom fontSize='15px'>
          🌍 If your soil boasts:
        </Typography>
        <List>
          <ListItem>Nitrogen: {data["nitrogen"]}</ListItem>
          <ListItem>Phosphorus: {data["phosphrus"]}</ListItem>
          <ListItem>Potassium: {data["potassium"]}</ListItem>
          <ListItem>Temperature: {data["temp"]}</ListItem>
          <ListItem>Humidity: {data["humidity"]}</ListItem>
          <ListItem>pH: {data["ph"]}</ListItem>
          <ListItem>Rainfall: {data["rainfall"]}</ListItem>
        </List>
        <Typography variant='h6' marginBottom='10px' fontSize='13px'>
          Then, consider planting {data["cropname"]} for a bountiful harvest! 🌿
          Share your soil insights and let's grow together! 🌱 #SoilNutrients
          #CropSuggestions #GardeningTips
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;

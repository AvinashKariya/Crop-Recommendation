import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
const CropCard = ({ data }) => {
  return (
    <Card
      sx={{
        width: 345,
        border: "1px solid #4F6F52",
        "@media (max-width: 600px)": {
          width: "400px", // Set a different width for screens with a max-width of 600 pixels (adjust as needed)
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='220'
          image={data.imgUrl}
          alt='green iguana'
          sx={{
            width: "380px",
            objectFit: "cover",
            "@media (max-width: 600px)": {
              width: "400px", // Set a different width for screens with a max-width of 600 pixels (adjust as needed)
            },
          }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {data["Crop Name"]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CropCard;

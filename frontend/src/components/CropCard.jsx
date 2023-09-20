import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
const CropCard = ({ data }) => {
  console.log(data);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='220'
          image={data.imgUrl}
          alt='green iguana'
          style={{
            width: "380px",
            objectFit: "cover",
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
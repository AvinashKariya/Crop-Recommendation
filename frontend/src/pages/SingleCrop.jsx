import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { cropList } from "../utils";
const SingleCrop = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [solution, setSolution] = useState();

  useEffect(() => {
    const res = cropList.find((crop) => crop.id === parseInt(id));
    setData(res);
    const keys = Object.keys(res["Solution for Disease Prevention"]);
    setSolution(keys);
  }, []);
  return (
    <>
      {data && (
        <Container
          maxWidth='xl'
          style={{ marginTop: "80px", marginBottom: "10px" }}
        >
          <KeyboardBackspaceIcon
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          />
          <Grid container>
            <Grid item sm={6} xs={12} xl={6}>
              <img
                src={data.imgUrl}
                alt=''
                style={{ width: "90%", height: "auto", objectFit: "cover" }}
              />
            </Grid>
            <Grid item sm={6}>
              <div>
                <Typography variant='h4' sx={{ fontWeight: "500" }}>
                  Crop Name : {data["Crop Name"]}
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Accordion>
                  <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography variant='h5'>Favorable Conditions</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant='h6'>
                      Climate:{" "}
                      <Typography>
                        {data["Favorable Conditions"].Climate}
                      </Typography>
                    </Typography>
                    <Typography variant='h6'>
                      Sunlight:{" "}
                      <Typography>
                        {data["Favorable Conditions"].Sunlight}
                      </Typography>
                    </Typography>
                    <Typography variant='h6'>
                      Rainfall:{" "}
                      <Typography>
                        {data["Favorable Conditions"].Rainfall}
                      </Typography>
                    </Typography>
                    <Typography variant='h6'>
                      Soil:{" "}
                      <Typography>
                        {data["Favorable Conditions"].Soil}
                      </Typography>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Accordion>
                  <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography variant='h5'>Unfavorable Conditions</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant='h6'>
                      Frost:{" "}
                      <Typography>
                        {data["Unfavorable Conditions"].Frost}
                      </Typography>
                    </Typography>
                    <Typography variant='h6'>
                      Waterlogging:{" "}
                      <Typography>
                        {data["Unfavorable Conditions"].Waterlogging}
                      </Typography>
                    </Typography>
                    <Typography variant='h6'>
                      Drought:{" "}
                      <Typography>
                        {data["Unfavorable Conditions"].Drought}
                      </Typography>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Accordion>
                  <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography variant='h5'>Possible Diseases</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data["Possible Diseases"].map((deases, i) => (
                      <Typography variant='h6' key={i}>
                        {deases.name}
                        <Typography>{deases.reason}</Typography>
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Accordion>
                  <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography variant='h5'>Suitable Fertilizers</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {data["Suitable Fertilizers"].map((ferti, i) => (
                        <ListItem key={i}>
                          <Typography>{ferti}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Accordion>
                  <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography variant='h5'>
                      Solution for Disease Prevention
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {solution.map((sol, i) => (
                      <Typography key={i} variant='h6'>
                        {sol}:
                        <Typography>
                          {data["Solution for Disease Prevention"][sol]}
                        </Typography>
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default SingleCrop;

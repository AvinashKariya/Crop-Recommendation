import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Typography,
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
    console.log(keys);
    setSolution(keys);
  }, []);
  return (
    <>
      {data && (
        <Container maxWidth='xl' style={{ marginTop: "80px" }}>
          <KeyboardBackspaceIcon
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Grid container>
            <Grid item sm={6} xs={12}>
              <img
                src={data.imgUrl}
                alt=''
                style={{ width: "700px", height: "400px" }}
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
                      <Typography key={i}>{deases}</Typography>
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
                    {data["Suitable Fertilizers"].map((ferti, i) => (
                      <Typography key={i}>{ferti}</Typography>
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

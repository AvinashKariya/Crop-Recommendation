import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

const AcceptedPost = () => {
  const [activeData, setActiveData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getActiveData = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/get-all-posts-admin"
      );
      const res = await response.data;
      const filteredData = res?.filter((item) => {
        if (item.status == "active") {
          return true;
        }
      });
      setActiveData(filteredData);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActiveData();
  }, []);
  return (
    <>
      {loader && (
        <CircularProgress
          sx={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
          }}
          color='success'
        />
      )}
      {!loader && activeData && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "700" }}>Crop Name</TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  City
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Phone
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Email
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Nitrogen
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Phosphrus
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Pottasium
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Temperature
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Humidity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  pH
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Rainfall
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeData?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.cropname}
                  </TableCell>
                  <TableCell align='right'>{row.city}</TableCell>
                  <TableCell align='right'>{row.phone}</TableCell>
                  <TableCell align='right'>{row.email}</TableCell>
                  <TableCell align='right'>{row.nitrogen}</TableCell>
                  <TableCell align='right'>{row.phosphrus}</TableCell>
                  <TableCell align='right'>{row.potassium}</TableCell>
                  <TableCell align='right'>{row.temp}</TableCell>
                  <TableCell align='right'>{row.humidity}</TableCell>
                  <TableCell align='right'>{row.ph}</TableCell>
                  <TableCell align='right'>{row.rainfall}</TableCell>
                  <TableCell align='right'>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default AcceptedPost;

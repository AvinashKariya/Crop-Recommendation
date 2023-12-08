import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllPost = () => {
  const [open, setOpen] = useState(false);
  const [loader_submit, setLoader_submit] = useState(false);
  const [loader_reject, setLoader_reject] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [rejectButton, setRejectButton] = useState(false);

  const getPosts = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-posts-admin` ||
          "http://127.0.0.1:5000/get-all-posts-admin"
      );
      const res = await response.data;
      setData(res);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  const openDialogue = (id, status) => {
    setOpen(true);
    setId(id);
    if (status == "active") {
      setRejectButton(true);
      setActiveButton(false);
    } else if (status == "rejected") {
      setRejectButton(false);
      setActiveButton(true);
    } else if (status == "pending") {
      setActiveButton(true);
      setRejectButton(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onAcceptButtonClick = () => {
    const objectId = id; // Replace with the actual object ID
    const newStatus = "active";

    handleStatusUpdate(objectId, newStatus);
  };

  const onRejectButtonClick = () => {
    const objectId = id; // Replace with the actual object ID
    const newStatus = "rejected";

    handleStatusUpdate(objectId, newStatus);
  };

  const handleStatusUpdate = async (objectId, newStatus) => {
    if (newStatus == "active") {
      setLoader_submit(true);
    } else {
      setLoader_reject(true);
    }
    // setLoader_submit(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/update_status/${objectId}` ||
          `http://127.0.0.1:5000/update_status/${objectId}`,
        {
          status: newStatus,
        }
      );

      console.log(response.data); // Check the response from the server
      setLoader_submit(false);
      setLoader_reject(false);
      setOpen(false);
      getPosts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  console.log(data);
  useEffect(() => {
    getPosts();
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
      {!loader && data && (
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
                <TableCell align='right' sx={{ fontWeight: "700" }}>
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
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
                  <TableCell
                    align='right'
                    onClick={() => openDialogue(row.id, row.status)}
                    sx={{ cursor: "pointer" }}
                  >
                    Edit
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Accept or Reject !</DialogTitle>
        <DialogActions>
          <Button
            onClick={onAcceptButtonClick}
            sx={{ color: "#4F6F52" }}
            disabled={loader_submit}
          >
            {activeButton &&
              (loader_submit ? (
                <CircularProgress
                  sx={{
                    display: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  color='success'
                />
              ) : (
                "Accept"
              ))}
          </Button>
          <Button
            onClick={onRejectButtonClick}
            color='error'
            disabled={loader_reject}
          >
            {rejectButton &&
              (loader_reject ? (
                <CircularProgress
                  sx={{
                    display: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  color='error'
                />
              ) : (
                "Reject"
              ))}
          </Button>
          <Button onClick={handleClose} color='error' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllPost;

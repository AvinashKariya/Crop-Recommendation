import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPost from "./pages/AllPost";
import AcceptedPost from "./pages/AcceptedPost";
import RejectedPost from "./pages/RejectedPost";
import PendingPost from "./pages/PendingPost";
import { Box } from "@mui/material";
function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllPost />} />
        <Route path='/accepted-post' element={<AcceptedPost />} />
        <Route path='/rejected-post' element={<RejectedPost />} />
        <Route path='/pending-post' element={<PendingPost />} />
      </Routes>
    </Box>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="min-h-screen bg-brand-grid bg-brand-gradient">
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
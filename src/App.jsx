import Picture from "./components/Picture";
import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [photos, setPhoto] = useState([]);

  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("กรุณาป้อนชื่อรูปภาพเพื่อค้นหา");
    } else {
      // เรียกใช้ API
      fetchImageFromAPI();
      
    }
  }

  async function fetchImageFromAPI() {
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}&per_page=30`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.results;
    if (result.length == 0) {
      alert("ไม่พบข้อมูลรูปภาพที่ต้องการค้นหา");
      setWord("");
    } else {
      setPhoto(result);
    }
  }

  return (
    <>
      <h1>ค้นหารูปภาพ</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="ป้อนชื่อรูปภาพที่ต้องการค้นหา"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">ค้นหา</button>
      </form>
      {/* แสดงข้อมูลรูปภาพ */}
      <div className="search-result">
        {photos.map((data, index) => {
          return <Picture {...data} key={index} />;
        })}
      </div>
    </>
  );
}

export default App;

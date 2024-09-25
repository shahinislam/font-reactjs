import React, { useEffect, useState } from "react";
import api from "../utils/api";

const FontList = () => {
  const [fonts, setFonts] = useState([]);
  const [fontGroups, setFontGroups] = useState([]);

  const fetchFonts = () => {
    api.get("/fonts").then((response) => {
      setFonts(response.data);
    });
  };

  const fetchFontGroups = () => {
    api.get("/font-groups").then((response) => {
      setFontGroups(response.data);
    });
  };


  useEffect(() => {
    fetchFonts();
    fetchFontGroups();
  }, []);

  return (
    <div>
  
      
    </div>
  );
};

export default FontList;

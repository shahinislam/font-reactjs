import React, { useEffect, useState } from "react";
import api from "../utils/api";

const FontUpload = () => {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    fetchFonts();
  }, []);

  const fetchFonts = () => {
    api.get("/fonts").then((response) => {
      setFonts(response.data);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileValidation(file);
  };

  const handleFileValidation = (file) => {
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "ttf") {
        // setFontFile(file);
        handleFileUpload(file); // Automatically upload after setting the file
      } else {
        alert("Please upload a valid TTF file.");
      }
    }
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("font", file);

    api
      .post("/fonts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        // setFontFile(null); // Clear the state after successful upload
        fetchFonts(); // Refresh the font list after upload
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    api.delete(`/fonts/${id}`).then(() => {
      fetchFonts();
    });
  };

  return (
    <>
      <section className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Only TTF File Allowed
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept=".ttf"
          />
        </div>
      </section>

      <section>
        <h3 className="text-4xl">Font List</h3>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Font name
                </th>
                <th scope="col" className="px-6 py-3">
                  Preview
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {fonts.map((font) => (
                <tr
                  key={font.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {font.name}
                  </th>
                  <td
                    className="px-6 py-4"
                    style={{
                      fontFamily: `${font.name}`,
                    }}
                  >
                    <style>
                      {`@font-face {
                            font-family: '${font.name}';
                            src: url('${api.defaults.mainURL}/storage/${font.path}');
                        }`}
                    </style>
                    Example Style
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(font.id)}
                      className="px-6 py-4 font-bold text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default FontUpload;

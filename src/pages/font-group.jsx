import React, { useEffect, useState } from "react";
import api from "../utils/api";

const FontGroup = () => {
  const [fonts, setFonts] = useState([]);
  const [fontGroups, setFontGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedFonts, setSelectedFonts] = useState([null]);
  const [editingGroupId, setEditingGroupId] = useState(null);

  useEffect(() => {
    fetchFonts();
    fetchFontGroups();
  }, []);

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

  const addRow = () => {
    setSelectedFonts([...selectedFonts, null]);
  };

  const handleChange = (index, value) => {
    const updatedFonts = [...selectedFonts];
    updatedFonts[index] = value;
    setSelectedFonts(updatedFonts);
  };

  const handleEdit = (groupId) => {
    const group = fontGroups.find((g) => g.id === groupId);

    if (group) {
      setGroupName(group.group_name);
      setSelectedFonts(group.fonts.map((font) => font.id)); 
      setEditingGroupId(groupId); 
    }
  };

  const handleSubmit = () => {
    if (selectedFonts.filter(Boolean).length < 2) {
      alert("Please select at least two fonts");
      return;
    }

    const data = {
      group_name: groupName,
      fonts: selectedFonts,
    };

    if (editingGroupId) {
      api
        .put(`/font-groups/${editingGroupId}`, data)
        .then(() => {
          setGroupName(""); 
          setSelectedFonts([null]);
          setEditingGroupId(null); 
          fetchFontGroups();
        })
        .catch((err) => console.error(err));
    } else {
      // Create new group
      api
        .post("/font-groups", data)
        .then(() => {
          setGroupName("");
          setSelectedFonts([null]);
          fetchFontGroups();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDelete = (id) => {
    api.delete(`/font-groups/${id}`).then(() => {
      fetchFontGroups();
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4 mb-3">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {selectedFonts?.map((font, index) => (
          <div key={index} className="relative">
            <select
              onChange={(e) => handleChange(index, e.target.value)}
              value={font || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Font</option>
              {fonts?.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex justify-between items-center py-4">
          <button
            onClick={addRow}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Row
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {editingGroupId ? "Update Group" : "Create Group"}
          </button>
        </div>
      </div>

      <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Font Groups</h3>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Fonts
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {fontGroups.map((group) => (
                <tr
                  key={group.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {group.group_name}
                  </th>
                  <td className="px-6 py-4">
                    {group.fonts.map((font) => font.name).join(", ")}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(group.id)}
                      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
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

export default FontGroup;

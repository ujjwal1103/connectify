import React, { useState } from "react";
import { readFileAsDataURL } from "../utils/helper";
import html2canvas from "html2canvas";

const Exp = () => {
  const [rows, setRows] = useState([{ id: 1, data: {} }]);
  const [file, setFile] = useState(null);
  // Function to add a new row
  const addRow = () => {
    const newRow = { id: rows[rows.length - 1].id + 1, data: {} };
    setRows([...rows, newRow]);
  };

  // Function to remove a row
  const removeRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Function to handle input change
  const handleInputChange = (e, id, columnName) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          data: {
            ...row.data,
            [columnName]: e.target.innerText,
          },
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleImagePic = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const dataURL = await readFileAsDataURL(file);
    console.log(dataURL);
    setFile(dataURL);
  };

  const handleDownload = async (e) => {
    const div = document.getElementById("downloadDiv");
    html2canvas(div, { allowTaint: true }).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  };

  return (
    <>
      <div className="w-full lg:p-3 overflow-y-scroll scroll-smooth snap-y bg-zinc-900 snap-mandatory h-dvh relative">
        <div>
          <div>
            <table className="border-collapse w-96 table-fixed">
              <thead>
                <tr>
                  <th className="border w-44">First Name</th>
                  <th className="border w-44">Last Name</th>
                  <th className="border w-44">Email</th>
                  <th className="border w-44">Mobile Number</th>
                  <th className="border w-44">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td
                      className=" border w-44"
                      contentEditable={true}
                      onInput={(e) => handleInputChange(e, row.id, "firstName")}
                    ></td>
                    <td
                      className=" border w-44"
                      contentEditable={true}
                      onInput={(e) => handleInputChange(e, row.id, "lastName")}
                    ></td>
                    <td
                      className=" border w-44"
                      contentEditable={true}
                      onInput={(e) => handleInputChange(e, row.id, "email")}
                    ></td>
                    <td
                      className=" border w-44"
                      contentEditable={true}
                      onInput={(e) =>
                        handleInputChange(e, row.id, "mobileNumber")
                      }
                    ></td>
                    <th className=" border w-44">
                      {
                        <button
                          disabled={rows.length <= 1}
                          onClick={() => removeRow(row.id)}
                        >
                          Remove
                        </button>
                      }
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={addRow}>Add Row</button>
        <pre>{JSON.stringify(rows, null, 2)}</pre>

        <div>
          <input type="file" onChange={handleImagePic} accept="image/*" />
          <button onClick={handleDownload}>Download</button>
        </div>

        
      </div>
    </>
  );
};

export default Exp;


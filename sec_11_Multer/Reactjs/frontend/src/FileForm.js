import React from "react";
import axios from "axios";

const FileForm = () => {
  const handleSubmit = e => {
    e.preventDefault();

    const file1 = document.querySelector("#file-field1").files[0];
    const file2 = document.querySelector("#file-field2").files[0];

    console.log(file1, " | ", file2);

    const url = "http://localhost:3000/uploadFiles";

    const config = {
      headers: { "content-type": "multipart/form-data" }
    };

    const data = new FormData();

    data.append("fsociety", file1);
    data.append("fsociety", file2);

    for (let pair of data.entries()) {
      console.log(pair[0], " | ", pair[1]);
    }

    axios.post(url, data, config).then(response => {
      console.log("\nresponse ->", response.data);
    });
  };

  return (
    <div>
      <h1>Sanity Check</h1>
      <form onSubmit={handleSubmit}>
        <input id="file-field1" type="file" name="fsociety" />
        <input id="file-field2" type="file" name="fsociety" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default FileForm;

import React, { FC, useState, useEffect } from "react"
import axios from "axios";
import styled from "styled-components";

const myApi = axios.create({
  baseURL: 'http://localhost:3030/upload',
  timeout: 10000,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})
interface UploadFilesProps {
  setUploadFile: (val: any) => any;
}

const StyledInput = styled.input`
  color: blue;
`;
const UploadFiles: FC<UploadFilesProps> = ({setUploadFile}) => {
  const [selectedFiles, setSelectedFiles] = useState<any | undefined>(undefined);

  useEffect(() => {
    myApi.get("").then((response) => {
      setUploadFile(response.data);
    });
  },[]);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    myApi.post('',currentFile)
    .then((res) => {
      console.log('Axios response ', res);
      return myApi.get("");
    })
    .then((files) => {
      setUploadFile(files.data);
    })
    .catch(() => {
    });

    setSelectedFiles(undefined);
  };

  return (
      <div>
        <label className="btn btn-default">
          <StyledInput type="file" className="form-control-file" onChange={selectFile} />
        </label>

        <button
            className="btn btn-success"
            disabled={!selectedFiles}
            onClick={upload}
        >
          Upload
        </button>
      </div>
  );
};

export default UploadFiles;
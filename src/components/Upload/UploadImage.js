import React, { useState } from "react";
import { Circle } from "rc-progress";
import Uploady, { useItemProgressListener, useFileInput } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useRef } from "react";
import { useParams } from 'react-router-dom';
import "./styles.css";

export default function UploadImage(props) {
const params = useParams();
const handleOnChange = (e) => {
  props.setFilename(e);
}

const MyForm = () => {
    const inputRef = useRef();
    useFileInput(inputRef);

    return <form action="/upload" method="POST">
        <input type="file" name="file" style={{ display: "none" }} ref={inputRef} onChange={(e) => handleOnChange(e.target.files[0].name)} />
    </form>;
};



const UploadProgress = () => {
  const [progress, setProgess] = useState(0);
  const progressData = useItemProgressListener();

  if (progressData && progressData.completed > progress) {
    setProgess(() => progressData.completed);
  }

  return (
    progressData && (
      <Circle
        style={{ height: "100px", marginTop: "20px" }}
        strokeWidth={2}
        strokeColor={progress === 100 ? "#00a626" : "#2db7f5"}
        percent={progress}
      />
    )
  );
};

  return (
    <Uploady
        destination={{ url: "http://127.0.0.1:8000/employee/savefile" }}
        customInput
    >
        <MyForm />
      <div className="text-center">
        {
        params.id?(
          <UploadButton className="mt-2 btn btn-block btn-info">Update Photo</UploadButton>
          ):(    
          <UploadButton className="mt-2 btn btn-block btn-info">Upload Photo</UploadButton>
        )}
        <br />
        <UploadProgress />
      </div>
    </Uploady>
  );
}
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import { Circle } from "rc-progress";
import UploadButton from "@rpldy/upload-button";
import cropImage from "./CropImage";
import UploadPreview, { PREVIEW_TYPES } from "@rpldy/upload-preview";
import { useRef } from "react";
import "./styles.css";
import Uploady, {
  withRequestPreSendUpdate,
  useItemFinalizeListener,
  useItemStartListener,
  useItemProgressListener, 
  useFileInput
} from "@rpldy/uploady";

const StyledReactCrop = styled(ReactCrop)`
  width: 100%;
  max-width: 900px;
  height: 400px;
`;

const PreviewImage = styled.img`
  margin: 5px;
  max-width: 200px;
  height: auto;
  max-height: 200px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const PreviewButtons = ({
  finished,
  crop,
  updateRequest,
  onUploadCancel,
  onUploadCrop
}) => {
  return (
    <ButtonsWrapper>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none"
        }}
        onClick={onUploadCrop}
      >
        Upload Cropped
      </button>
      <button
        style={{ display: !finished && updateRequest ? "block" : "none" }}
        onClick={updateRequest}
      >
        Upload without Crop
      </button>
      <button
        style={{
          display: !finished && updateRequest && crop ? "block" : "none"
        }}
        onClick={onUploadCancel}
      >
        Cancel
      </button>
    </ButtonsWrapper>
  );
};

const UPLOAD_STATES = {
  NONE: 0,
  UPLOADING: 1,
  FINISHED: 2
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const {
    id,
    url,
    isFallback,
    type,
    updateRequest,
    requestData,
    previewMethods
  } = props;
  const cropRef = useRef(null);
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.NONE);
  const [crop, setCrop] = useState(null);
  const [croppedUrl, setCroppedUrl] = useState(null);
  const isFinished = uploadState === UPLOAD_STATES.FINISHED;

  useItemStartListener(() => setUploadState(UPLOAD_STATES.UPLOADING), id);
  useItemFinalizeListener(() => setUploadState(UPLOAD_STATES.FINISHED), id);

  const onImageLoaded = useCallback((image) => {
    cropRef.current = image;
  }, []);

  const onUploadCrop = useCallback(async () => {
    if (updateRequest && (crop?.height || crop?.width)) {
      const { blob: croppedBlob, blobUrl, revokeUrl } = await cropImage(
        cropRef.current,
        requestData.items[0].file,
        crop,
        true
      );

      requestData.items[0].file = croppedBlob;

      updateRequest({ items: requestData.items });
      setCroppedUrl({ blobUrl, revokeUrl });
    }
  }, [requestData, updateRequest, crop]);

  const onUploadCancel = useCallback(() => {
    updateRequest(false);
    if (previewMethods.current?.clear) {
      previewMethods.current.clear();
    }
  }, [updateRequest, previewMethods]);

  useEffect(() => () => croppedUrl?.revokeUrl(), [croppedUrl]);

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? (
    <PreviewImage src={url} alt="fallback img" />
  ) : (
    <>
      {requestData && uploadState === UPLOAD_STATES.NONE ? (
        <StyledReactCrop
          ruleOfThirds
          src={url}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onChange={setCrop}
          onComplete={setCrop}
          style={{ height: "100%" }}
        />
      ) : (
        <PreviewImage src={croppedUrl?.blobUrl || url} alt="img to upload" />
      )}
      <PreviewButtons
        finished={isFinished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
      <p>{isFinished ? "FINISHED" : ""}</p>
    </>
  );
});

const filterBySize = (file) => {
  //filter out images larger than 5MB
  return file.size <= 5242880;
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

export default function UploadImage(props) {
  const handleOnChange = (e) => {
  props.setFilename(e);
  }
  const previewMethodsRef = useRef();
  const MyForm = () => {
    const inputRef = useRef();
    useFileInput(inputRef);

    return <form action="/upload" method="POST">
        <input type="file" name="file" style={{ display: "none" }} ref={inputRef} onChange={(e) => handleOnChange(e.target.files[0].name)} />
    </form>;
};
  return (
    <Uploady
        destination={{ url: "http://127.0.0.1:8000/employee/savefile" }}
        customInput
        fileFilter={filterBySize}
        accept="image/*"
    >
        <MyForm />
      <div className="text-center">
        <UploadButton className="mt-2 btn btn-block btn-info">Upload Photo</UploadButton>
        <br />
        <UploadPreview
          PreviewComponent={ItemPreviewWithCrop}
          previewComponentProps={{ previewMethods: previewMethodsRef }}
          previewMethodsRef={previewMethodsRef}
          fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
        />
        <br />
        <UploadProgress />
      </div>
    </Uploady>
  );
}
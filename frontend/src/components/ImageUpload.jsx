import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUpload({ onFileSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFileSelect(acceptedFiles[0]);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #aaa",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#f0f0f0" : "transparent",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here...</p> : <p>Drag or click to upload image</p>}
    </div>
  );
}

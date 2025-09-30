import { useRef } from "react";

function UploadPicture({ id, refresh }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please upload a file.");
      return;
    }
    console.log("Selected file:", file.name);
    

    const formData = new FormData();
    formData.append("image", file);
    

    const res = await fetch(
      `https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/inventory/${id}/upload-picture`,
      {
        //add codespace url
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.ok) {
      alert("Image uploaded successfully!");
      if (refresh) refresh();
    } else {
      alert("An error has occurred.  Please try again!");
    }
  };


  return (
    <div>
      <button
        className="bg-yellow-500 text-white px-2 py-2 rounded"
        onClick={() => fileInputRef.current.click()}
      >
        Upload Picture
      </button>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadPicture;

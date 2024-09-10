"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import TinyMCE
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

function ServiceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
console.log(content)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/service/new", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        setPrice("");
        setContent("");
        setImage(null);
        setImagePreview(null);
        toast.success("Added successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Failed to add. Please try again.", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <div className="container mx-auto px-4 py-24">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <h1 className="text-3xl font-bold mb-4">Create New Service</h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">
              Small Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">
              Prices
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
             
            />
          </div>

          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">
              Content
            </label>
            <Editor
              apiKey="fensjrwxuiir8lruyfge9jlaj9wic7u3r0qhfwfqnz0weyqj"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                  'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                  'media', 'table', 'emoticons', 'help'
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | image media link | \
                  code preview fullscreen | help",
                image_advtab: true,
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype === "image") {
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");

                    input.onchange = function () {
                      const file = this.files[0];
                      const reader = new FileReader();

                      reader.onload = function () {
                        const id = "blobid" + new Date().getTime();
                        const blobCache =
                          window.tinymce.activeEditor.editorUpload.blobCache;
                        const base64 = reader.result.split(",")[1];
                        const blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        callback(blobInfo.blobUri(), { title: file.name });
                      };

                      reader.readAsDataURL(file);
                    };

                    input.click();
                  }
                },
              }}
            />
          </div>

          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">
              Image Upload
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="w-full max-w-xs"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2"
                  onClick={removeImage}
                >
                  X
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
               {loading ? (
               <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>  
            ) : (
              "Create")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ServiceForm;

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), { ssr: false });

function ServiceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = useParams();
console.log(id)
  useEffect(() => {
    // Fetch existing service data by id
    const fetchServiceData = async () => {
      try {
        const res = await fetch(`/api/service/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price);
          setContent(data.content);
          setImagePreview(data.feature_img);
        } else {
          toast.error("Failed to fetch service data.", {
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
      }
    };

    if (id) fetchServiceData();
  }, [id]);

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

      const res = await fetch(`/api/service/${id}/update`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        toast.success("Updated successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Failed to update. Please try again.", {
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
    <div className="h-full bg-gray-100 relative">
      <div className="container mx-auto px-4 py-24">
        <ToastContainer autoClose={1000} />
        <h1 className="text-3xl font-bold mb-4">{id ? "Update Service" : "Create New Service"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">Small Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">Prices</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="bg-white p-4 my-2 rounded-lg shadow-sm">
            <label className="block text-gray-700 font-medium mb-1">Content</label>
            <Editor
              apiKey="fensjrwxuiir8lruyfge9jlaj9wic7u3r0qhfwfqnz0weyqj"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink link image lists charmap preview anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media table emoticons help",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media link | code preview fullscreen | help",
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
                        const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
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
            <label className="block text-gray-700 font-medium mb-1">Image Upload</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
            {imagePreview && (
              <div className="relative">
                <img src={imagePreview} alt="Uploaded" className="w-full max-w-xs" />
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
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm;

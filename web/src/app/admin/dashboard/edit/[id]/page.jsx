"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/utils/useUser";
import { useUpload } from "@/utils/useUpload";
import { ArrowLeft, X, Upload } from "lucide-react";

const AVAILABLE_TAGS = ["Branding", "Web", "Video", "Photography"];

export default function EditProjectPage({ params }) {
  const { data: user, loading: userLoading } = useUser();
  const { uploadFiles } = useUpload();
  const projectId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    type_tags: [],
    description: "",
  });
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [newPhotoFiles, setNewPhotoFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userLoading && (!user || user.email !== "geral@mindframe.media")) {
      window.location.href = "/admin";
    }
  }, [user, userLoading]);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const response = await fetch("/api/projects/list");
      if (!response.ok) throw new Error("Failed to load projects");
      const data = await response.json();
      const project = data.projects.find((p) => p.id === parseInt(projectId));

      if (!project) {
        throw new Error("Project not found");
      }

      setFormData({
        title: project.title || "",
        type_tags: project.type_tags || [],
        description: project.description || "",
      });
      setExistingPhotos(project.media_urls || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      type_tags: prev.type_tags.includes(tag)
        ? prev.type_tags.filter((t) => t !== tag)
        : [...prev.type_tags, tag],
    }));
  };

  const handleNewPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    const totalPhotos = existingPhotos.length + newPhotos.length + files.length;
    if (totalPhotos > 10) {
      setError("Maximum 10 photos allowed");
      return;
    }

    const invalidFiles = files.filter((file) => file.size > 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError("Each photo must be less than 1MB");
      return;
    }

    const photos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewPhotoFiles([...newPhotoFiles, ...files]);
    setNewPhotos([...newPhotos, ...photos]);
  };

  const removeExistingPhoto = (index) => {
    setExistingPhotos(existingPhotos.filter((_, i) => i !== index));
  };

  const removeNewPhoto = (index) => {
    setNewPhotos(newPhotos.filter((_, i) => i !== index));
    setNewPhotoFiles(newPhotoFiles.filter((_, i) => i !== index));
  };

  const movePhotoUp = (index, isExisting) => {
    if (isExisting) {
      if (index === 0) return;
      const newArr = [...existingPhotos];
      const temp = newArr[index];
      newArr[index] = newArr[index - 1];
      newArr[index - 1] = temp;
      setExistingPhotos(newArr);
    } else {
      if (index === 0 && existingPhotos.length === 0) return;
      if (index === 0 && existingPhotos.length > 0) {
        const photoUrl = newPhotos[0].preview;
        setExistingPhotos([...existingPhotos, photoUrl]);
        setNewPhotos(newPhotos.slice(1));
        setNewPhotoFiles(newPhotoFiles.slice(1));
      } else {
        const newArr = [...newPhotos];
        const temp = newArr[index];
        newArr[index] = newArr[index - 1];
        newArr[index - 1] = temp;
        setNewPhotos(newArr);

        const filesArr = [...newPhotoFiles];
        const tempFile = filesArr[index];
        filesArr[index] = filesArr[index - 1];
        filesArr[index - 1] = tempFile;
        setNewPhotoFiles(filesArr);
      }
    }
  };

  const movePhotoDown = (index, isExisting) => {
    if (isExisting) {
      if (index === existingPhotos.length - 1 && newPhotos.length === 0) return;
      if (index === existingPhotos.length - 1 && newPhotos.length > 0) {
        return;
      }
      const newArr = [...existingPhotos];
      const temp = newArr[index];
      newArr[index] = newArr[index + 1];
      newArr[index + 1] = temp;
      setExistingPhotos(newArr);
    } else {
      if (index === newPhotos.length - 1) return;
      const newArr = [...newPhotos];
      const temp = newArr[index];
      newArr[index] = newArr[index + 1];
      newArr[index + 1] = temp;
      setNewPhotos(newArr);

      const filesArr = [...newPhotoFiles];
      const tempFile = filesArr[index];
      filesArr[index] = filesArr[index + 1];
      filesArr[index + 1] = tempFile;
      setNewPhotoFiles(filesArr);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title) {
      setError("Title is required");
      return;
    }

    const totalPhotos = existingPhotos.length + newPhotos.length;
    if (totalPhotos === 0) {
      setError("At least one photo is required");
      return;
    }

    if (formData.description.length > 200) {
      setError("Description must be 200 characters or less");
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedUrls = [];
      if (newPhotoFiles.length > 0) {
        uploadedUrls = await uploadFiles(newPhotoFiles);
      }

      const allPhotos = [...existingPhotos, ...uploadedUrls];

      const response = await fetch("/api/projects/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: parseInt(projectId),
          ...formData,
          media_urls: allPhotos,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update project");
      }

      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update project");
      setIsSubmitting(false);
    }
  };

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || user.email !== "geral@mindframe.media") {
    return null;
  }

  const allPhotos = [
    ...existingPhotos.map((url, i) => ({ url, index: i, isExisting: true })),
    ...newPhotos.map((photo, i) => ({
      url: photo.preview,
      index: i,
      isExisting: false,
    })),
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-[#FF0000] font-poppins transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </a>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold font-montserrat mb-8">
          Edit <span className="text-[#FF0000]">Project</span>
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white text-black rounded-lg p-8 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] font-poppins"
              placeholder="Project title"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Tags
            </label>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_TAGS.map((tag) => (
                <label key={tag} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.type_tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="mr-2 w-4 h-4 text-[#FF0000] focus:ring-[#FF0000] rounded"
                  />
                  <span className="text-sm font-poppins">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Photos * (Min: 1, Max: 10, Max 1MB each)
            </label>
            <div className="mb-4">
              <label className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors font-poppins">
                <Upload size={20} />
                Add More Photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewPhotoChange}
                  className="hidden"
                  disabled={allPhotos.length >= 10}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                {allPhotos.length} / 10 photos. Drag to reorder (first photo is
                main photo).
              </p>
            </div>

            {allPhotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allPhotos.map((photo, globalIndex) => (
                  <div
                    key={`${photo.isExisting}-${photo.index}`}
                    className="relative group"
                  >
                    <img
                      src={photo.url}
                      alt={`Photo ${globalIndex + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {globalIndex === 0 && (
                      <div className="absolute top-2 left-2 bg-[#FF0000] text-white text-xs px-2 py-1 rounded font-poppins">
                        Main
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {globalIndex > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            movePhotoUp(photo.index, photo.isExisting)
                          }
                          className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs"
                        >
                          ↑
                        </button>
                      )}
                      {globalIndex < allPhotos.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            movePhotoDown(photo.index, photo.isExisting)
                          }
                          className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs"
                        >
                          ↓
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          photo.isExisting
                            ? removeExistingPhoto(photo.index)
                            : removeNewPhoto(photo.index)
                        }
                        className="bg-black bg-opacity-70 text-white p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Description (Max 200 characters)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              maxLength={200}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0000] font-poppins resize-none"
              placeholder="Brief project description"
            />
            <p className="text-sm text-gray-500 mt-1 text-right">
              {formData.description.length} / 200
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FF0000] text-white py-3 rounded-lg font-semibold font-poppins hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Project"}
            </button>
            <a
              href="/admin/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold font-poppins hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

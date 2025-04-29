import React, { useState } from "react";
import { createLink } from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";


const CreateLinkPage: React.FC = () => {
  const [deepLink, setDeepLink] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await createLink({
        deep_link: deepLink,
        fallback_url: fallbackUrl,
        custom_alias: customAlias
      }, token);
      setSuccess(`Short link created: ${window.location.origin}/${response.shortcode}`);
      setDeepLink("");
      setFallbackUrl("");
      setCustomAlias("");
    } catch (err) {
      setError("Failed to create short link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a Short Link</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="deepLink" className="block text-sm font-medium text-gray-700">Deep Link</label>
              <input id="deepLink" name="deepLink" type="url" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={deepLink} onChange={(e) => setDeepLink(e.target.value)} />
            </div>
            <div>
              <label htmlFor="fallbackUrl" className="block text-sm font-medium text-gray-700">Fallback URL</label>
              <input id="fallbackUrl" name="fallbackUrl" type="url" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={fallbackUrl} onChange={(e) => setFallbackUrl(e.target.value)} />
            </div>
            <div>
              <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700">Custom Alias (optional)</label>
              <input id="customAlias" name="customAlias" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={customAlias} onChange={(e) => setCustomAlias(e.target.value)} />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>
              {loading ? "Creating..." : "Create Short Link"}
            </button>
          </form>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-center text-sm text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateLinkPage;

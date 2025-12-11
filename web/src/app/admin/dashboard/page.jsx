"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/utils/useUser";
import useAuth from "@/utils/useAuth";
import {
  Trash2,
  Edit,
  Plus,
  Mail,
  MailOpen,
  Package,
  Settings,
  FolderOpen,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data: user, loading } = useUser();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("portfolio"); // portfolio, messages, settings

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  // Messages state
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.email !== "geral@mindframe.media")) {
      window.location.href = "/admin";
    }
  }, [user, loading]);

  useEffect(() => {
    loadProjects();
    loadMessages();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch("/api/projects/list");
      if (!response.ok) throw new Error("Failed to load projects");
      const data = await response.json();
      setProjects(data.projects);
    } catch (err) {
      console.error(err);
      setProjectsError("Failed to load projects");
    } finally {
      setProjectsLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await fetch("/api/contact/list");
      if (!response.ok) throw new Error("Failed to load messages");
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      console.error(err);
      setMessagesError("Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/delete?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/contact/delete?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete message");

      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete message");
    }
  };

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const response = await fetch(
        `/api/contact/mark-read?id=${id}&isRead=${!currentStatus}`,
        {
          method: "PUT",
        },
      );

      if (!response.ok) throw new Error("Failed to update message");

      setMessages(
        messages.map((m) =>
          m.id === id ? { ...m, is_read: !currentStatus } : m,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update message");
    }
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/admin",
      redirect: true,
    });
  };

  if (loading || projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || user.email !== "geral@mindframe.media") {
    return null;
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black font-montserrat">
            Admin <span className="text-[#FF0000]">Dashboard</span>
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="/admin/finance"
              className="bg-[#FF0000] text-white px-4 py-2 rounded-lg font-semibold font-poppins hover:bg-red-700 transition-colors"
            >
              Abrir Financeiro
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:text-[#FF0000] font-poppins transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-6 py-4 font-semibold font-poppins flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "portfolio"
                  ? "border-[#FF0000] text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <FolderOpen size={20} />
              Portfólio
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-6 py-4 font-semibold font-poppins flex items-center gap-2 border-b-2 transition-colors relative ${
                activeTab === "messages"
                  ? "border-[#FF0000] text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Mail size={20} />
              Mensagens
              {unreadCount > 0 && (
                <span className="bg-[#FF0000] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-4 font-semibold font-poppins flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-[#FF0000] text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Settings size={20} />
              Configurações
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-montserrat">
                Portfolio Projects
              </h2>
              <a
                href="/admin/dashboard/new"
                className="bg-[#FF0000] text-white px-6 py-3 rounded-lg font-semibold font-poppins hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                New Project
              </a>
            </div>

            {projectsError && (
              <div className="mb-4 p-4 bg-red-900 border border-red-700 text-red-100 rounded-lg">
                {projectsError}
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Photo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Photos
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-8 text-center text-gray-500 font-poppins"
                      >
                        No projects yet. Create your first one!
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {project.media_urls &&
                          project.media_urls.length > 0 ? (
                            <img
                              src={project.media_urls[0]}
                              alt={project.title}
                              className="h-16 w-16 object-cover rounded"
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No photo
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 font-poppins">
                            {project.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {project.type_tags?.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.media_urls?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <a
                              href={`/admin/dashboard/edit/${project.id}`}
                              className="text-blue-600 hover:text-blue-900 p-2"
                            >
                              <Edit size={18} />
                            </a>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-600 hover:text-red-900 p-2"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div>
            <h2 className="text-3xl font-bold font-montserrat mb-8">
              Contact Messages
            </h2>

            {messagesError && (
              <div className="mb-4 p-4 bg-red-900 border border-red-700 text-red-100 rounded-lg">
                {messagesError}
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-500 font-poppins"
                      >
                        No messages yet.
                      </td>
                    </tr>
                  ) : (
                    messages.map((message) => (
                      <tr
                        key={message.id}
                        className={`hover:bg-gray-50 ${
                          !message.is_read ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleToggleRead(message.id, message.is_read)
                            }
                            className="text-gray-500 hover:text-[#FF0000]"
                          >
                            {message.is_read ? (
                              <MailOpen size={20} />
                            ) : (
                              <Mail size={20} />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 font-poppins">
                            {message.name}
                          </div>
                          {message.phone && (
                            <div className="text-sm text-gray-500">
                              {message.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={`mailto:${message.email}`}
                            className="text-sm text-blue-600 hover:text-blue-900"
                          >
                            {message.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-md truncate">
                            {message.message}
                          </div>
                          {message.project_type && (
                            <div className="text-xs text-gray-500 mt-1">
                              Type: {message.project_type}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleDateString(
                            "pt-PT",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-600 hover:text-red-900 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-3xl font-bold font-montserrat mb-8">
              Configurações
            </h2>

            <div className="space-y-6">
              {/* Resend */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-[#FF0000]" size={32} />
                  <h3 className="text-xl font-bold font-montserrat text-black">
                    Resend (Email)
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700 font-poppins">
                  <div className="flex justify-between items-center">
                    <span>API Key:</span>
                    <span
                      className={`font-semibold ${
                        process.env.RESEND_API_KEY
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {process.env.RESEND_API_KEY
                        ? "✓ Configured"
                        : "✗ Not configured"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>From Email:</span>
                    <span className="text-sm text-gray-600">
                      {process.env.RESEND_FROM_EMAIL || "Not set"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stripe */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="text-[#FF0000]" size={32} />
                  <h3 className="text-xl font-bold font-montserrat text-black">
                    Stripe (Payments)
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700 font-poppins">
                  <div className="flex justify-between items-center">
                    <span>Secret Key:</span>
                    <span
                      className={`font-semibold ${
                        process.env.STRIPE_SECRET_KEY
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {process.env.STRIPE_SECRET_KEY
                        ? "✓ Configured"
                        : "✗ Not configured"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mode:</span>
                    <span className="text-sm text-gray-600">
                      {process.env.STRIPE_SECRET_KEY?.includes("test")
                        ? "Test"
                        : process.env.STRIPE_SECRET_KEY
                          ? "Live"
                          : "Not set"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="bg-gray-100 rounded-lg p-6 text-gray-700 font-poppins text-sm">
                <p>
                  💡 <strong>Nota:</strong> Para alterar estas configurações,
                  utilize as variáveis de ambiente no painel de configuração da
                  plataforma.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

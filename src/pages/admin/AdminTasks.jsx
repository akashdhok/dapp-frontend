import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getAssetUrl } from '../../services/api';
import {
  CheckSquare,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminTasks = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [submissionFilter, setSubmissionFilter] = useState('all');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add Task Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskReward, setTaskReward] = useState('35');
  const [taskImageFile, setTaskImageFile] = useState(null);
  const [taskImageUrl, setTaskImageUrl] = useState('');
  const [creatingTask, setCreatingTask] = useState(false);

  // Review Modal State
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [adminRemark, setAdminRemark] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Lightbox for screenshot
  const [previewImage, setPreviewImage] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.admin.getTasks();
      if (res.success) {
        setTasks(res.tasks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await api.admin.getSubmissions(submissionFilter);
      if (res.success) {
        setSubmissions(res.submissions);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([fetchTasks(), fetchSubmissions()]);
    } catch (err) {
      setError(err.message || 'Failed to load task data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [submissionFilter]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setCreatingTask(true);
    setError('');

    try {
      let res;
      if (taskImageFile) {
        const formData = new FormData();
        formData.append('title', taskTitle);
        formData.append('description', taskDescription);
        formData.append('reward', taskReward);
        formData.append('image', taskImageFile);
        res = await api.admin.createTask(formData, true);
      } else {
        if (!taskImageUrl) {
          throw new Error('Please upload an image or provide an image URL');
        }
        res = await api.admin.createTask({
          title: taskTitle,
          description: taskDescription,
          reward: taskReward,
          imageUrl: taskImageUrl,
        });
      }

      if (res.success) {
        setIsAddModalOpen(false);
        setTaskTitle('');
        setTaskDescription('');
        setTaskReward('35');
        setTaskImageFile(null);
        setTaskImageUrl('');
        await fetchTasks();
        alert('Task created successfully! It is now live for users.');
      }
    } catch (err) {
      alert(err.message || 'Failed to create task');
    } finally {
      setCreatingTask(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task? All related user submissions will also be deleted.')) {
      return;
    }
    try {
      const res = await api.admin.deleteTask(taskId);
      if (res.success) {
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        await fetchSubmissions();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete task');
    }
  };

  const handleUpdateSubmissionStatus = async (status) => {
    if (!selectedSubmission) return;
    setActionLoading(true);
    try {
      const res = await api.admin.updateSubmissionStatus(
        selectedSubmission._id,
        status,
        adminRemark
      );
      if (res.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s._id === selectedSubmission._id ? res.submission : s))
        );
        setSelectedSubmission(null);
        setAdminRemark('');
      }
    } catch (err) {
      alert(err.message || 'Failed to update submission');
    } finally {
      setActionLoading(false);
    }
  };

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            <span>NEXORA Task Management & Screenshot Verification</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Publish social media & learning tasks, verify user screenshot proofs, and credit rewards.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Task</span>
        </motion.button>
      </motion.div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${activeTab === 'submissions'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
        >
          <Clock className="w-4 h-4 text-amber-500" />
          <span>User Proof Submissions (SS)</span>
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
              {pendingCount} Pending
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${activeTab === 'tasks'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
        >
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>Active Tasks Catalogue ({tasks.length})</span>
        </button>
      </div>

      {/* TAB 1: USER SUBMISSIONS (SCREENSHOT REVIEW) */}
      {activeTab === 'submissions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setSubmissionFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition cursor-pointer ${submissionFilter === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="white-card rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-500">Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                No {submissionFilter !== 'all' ? submissionFilter : ''} task submissions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Task Info</th>
                      <th className="py-3.5 px-4">Submitted By</th>
                      <th className="py-3.5 px-4">Screenshot Proof (SS)</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Admin Remarks</th>
                      <th className="py-3.5 px-4 text-right">Review Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {submissions.map((sub) => (
                      <tr key={sub._id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">
                            {sub.taskId?.title || 'Unknown Task'}
                          </div>
                          <span className="text-[11px] text-emerald-600 font-semibold">
                            Reward: ${sub.taskId?.reward || 0} USDT
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-900">{sub.userId?.name || 'User'}</div>
                          <div className="text-slate-500 text-[11px]">{sub.userId?.email}</div>
                          <div className="text-slate-400 text-[10px]">
                            {new Date(sub.createdAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={getAssetUrl(sub.screenshotUrl)}
                              alt="SS Proof"
                              className="w-14 h-14 object-cover rounded-xl border border-slate-200 cursor-pointer hover:opacity-80 transition shadow-xs"
                              onClick={() => setPreviewImage(getAssetUrl(sub.screenshotUrl))}
                            />
                            <button
                              onClick={() => setPreviewImage(getAssetUrl(sub.screenshotUrl))}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                              title="Inspect full image"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${sub.status === 'approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : sub.status === 'rejected'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                          >
                            {sub.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {sub.status === 'rejected' && <XCircle className="w-3 h-3 text-rose-600" />}
                            {sub.status === 'pending' && <Clock className="w-3 h-3 text-amber-600" />}
                            {sub.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 text-xs max-w-xs">
                          {sub.adminRemark ? (
                            <span className="italic text-slate-600">"{sub.adminRemark}"</span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedSubmission(sub);
                              setAdminRemark(sub.adminRemark || '');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs transition cursor-pointer"
                          >
                            Review / Update
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 2: ALL TASKS LIST */}
      {activeTab === 'tasks' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="white-card-hover rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={getAssetUrl(task.imageUrl)}
                  alt={task.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                  ${task.reward} USDT Reward
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{task.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CREATE TASK MODAL WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Create New Task</span>
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Add task details, instructions, reward in USDT, and a task banner/instruction image.
              </p>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g. Subscribe to Official YouTube Channel"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Instructions</label>
                  <textarea
                    required
                    rows={3}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe what the user must do and what screenshot proof they must submit..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reward (USDT)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={taskReward}
                    onChange={(e) => setTaskReward(e.target.value)}
                    placeholder="35"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Task Image / Banner</label>
                  <div className="space-y-2">
                    <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100/70 transition">
                      <input
                        type="file"
                        id="admin-task-img"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setTaskImageFile(e.target.files[0]);
                            setTaskImageUrl('');
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="admin-task-img"
                        className="cursor-pointer flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-slate-900"
                      >
                        <Upload className="w-5 h-5 text-blue-600" />
                        <span className="text-xs font-medium">
                          {taskImageFile ? taskImageFile.name : 'Click to select image file from device'}
                        </span>
                      </label>
                    </div>

                    <div className="text-center text-[10px] text-slate-400 uppercase font-semibold">
                      — OR USE IMAGE URL —
                    </div>

                    <input
                      type="url"
                      value={taskImageUrl}
                      onChange={(e) => {
                        setTaskImageUrl(e.target.value);
                        setTaskImageFile(null);
                      }}
                      placeholder="https://images.unsplash.com/... or web URL"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={creatingTask}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
                  >
                    {creatingTask ? 'Publishing...' : 'Publish Task'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REVIEW SUBMISSION MODAL WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedSubmission(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Verify User Screenshot Proof</h3>
              <p className="text-xs text-slate-500 mb-4">
                Inspect user proof screenshot and update verification status.
              </p>

              <div className="space-y-4">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <p className="text-slate-800">
                    <strong className="text-slate-500">Task:</strong> {selectedSubmission.taskId?.title}
                  </p>
                  <p className="text-slate-800">
                    <strong className="text-slate-500">User:</strong> {selectedSubmission.userId?.name} ({selectedSubmission.userId?.email})
                  </p>
                  <p className="text-slate-800">
                    <strong className="text-slate-500">Reward:</strong> ${selectedSubmission.taskId?.reward} USDT
                  </p>
                  {selectedSubmission.notes && (
                    <p className="text-slate-800">
                      <strong className="text-slate-500">User Notes:</strong> "{selectedSubmission.notes}"
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Uploaded Proof Screenshot (SS):
                  </label>
                  <div className="rounded-xl overflow-hidden border border-slate-200 max-h-64 bg-slate-900 flex items-center justify-center p-2">
                    <img
                      src={getAssetUrl(selectedSubmission.screenshotUrl)}
                      alt="Proof"
                      className="max-h-60 object-contain cursor-pointer rounded-lg"
                      onClick={() => setPreviewImage(getAssetUrl(selectedSubmission.screenshotUrl))}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 text-center mt-1">
                    Click image to inspect in full resolution
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Admin Feedback / Reason (Optional)
                  </label>
                  <input
                    type="text"
                    value={adminRemark}
                    onChange={(e) => setAdminRemark(e.target.value)}
                    placeholder="e.g. Screenshot verified! or Task incomplete"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleUpdateSubmissionStatus('rejected')}
                    className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Reject Submission</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleUpdateSubmissionStatus('approved')}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Credit Reward</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL LIGHTBOX WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {previewImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-screen"
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-10 right-0 text-white p-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 rounded-full cursor-pointer"
              >
                ✕ Close
              </button>
              <img
                src={previewImage}
                alt="Screenshot Preview"
                className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

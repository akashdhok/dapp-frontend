import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getAssetUrl } from '../../services/api';
import {
  CheckSquare,
  Upload,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  Send,
} from 'lucide-react';

export const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Submit Modal
  const [selectedTask, setSelectedTask] = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Full screenshot inspection modal
  const [lightboxImage, setLightboxImage] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.user.getTasks();
      if (res.success) {
        setTasks(res.tasks);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenSubmit = (task) => {
    setSelectedTask(task);
    setScreenshotFile(null);
    setScreenshotUrl('');
    setPreviewImage(null);
    setNotes('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFile(file);
      setScreenshotUrl('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    if (!screenshotFile && !screenshotUrl) {
      alert('Please upload a screenshot file or paste a screenshot URL');
      return;
    }

    setSubmitting(true);
    try {
      let res;
      if (screenshotFile) {
        const formData = new FormData();
        formData.append('screenshot', screenshotFile);
        formData.append('notes', notes);
        res = await api.user.submitTaskProof(selectedTask._id, formData, true);
      } else {
        res = await api.user.submitTaskProof(selectedTask._id, {
          screenshotUrl,
          notes,
        });
      }

      if (res.success) {
        setSelectedTask(null);
        await fetchTasks();
        alert('Screenshot proof submitted successfully! Awaiting administrator verification.');
      }
    } catch (err) {
      alert(err.message || 'Failed to submit proof');
    } finally {
      setSubmitting(false);
    }
  };

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            <span>Daily Educational & Engagement Tasks</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Complete assigned social media tasks, submit your screenshot (SS) proof, and receive verified USDT reward credits.
          </p>
        </div>
      </motion.div>

      {/* Tasks Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-9 w-9 rounded-full border-4 border-blue-600 border-t-transparent shadow-md"
          />
        </div>
      ) : error ? (
        <div className="p-6 text-center text-rose-600 text-sm">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-sm">
          No tasks currently available. Please check back soon.
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tasks.map((task) => {
            const sub = task.mySubmission;
            const isApproved = sub?.status === 'approved';
            const isPending = sub?.status === 'pending';
            const isRejected = sub?.status === 'rejected';

            return (
              <motion.div
                key={task._id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="white-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Banner Image */}
                <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                  <img
                    src={getAssetUrl(task.imageUrl)}
                    alt={task.title}
                    className="w-full h-full object-cover transition duration-300"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                    <span>${task.reward} USDT</span>
                  </div>

                  {/* Status Overlay */}
                  {sub && (
                    <div className="absolute top-3 left-3">
                      {isApproved && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approved
                        </span>
                      )}
                      {isPending && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                          <Clock className="w-3.5 h-3.5" />
                          Under Review
                        </span>
                      )}
                      {isRejected && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-600 text-white flex items-center gap-1 shadow-xs">
                          <XCircle className="w-3.5 h-3.5" />
                          Rejected
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{task.title}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {task.description}
                    </p>

                    {/* Proof Info */}
                    {sub && (
                      <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Your Uploaded Proof:</span>
                          <button
                            onClick={() => setLightboxImage(getAssetUrl(sub.screenshotUrl))}
                            className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect SS</span>
                          </button>
                        </div>
                        {sub.adminRemark && (
                          <p className="text-amber-800 text-[11px] bg-amber-50 p-1.5 rounded border border-amber-200">
                            <strong>Admin Feedback:</strong> {sub.adminRemark}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="pt-5 mt-4 border-t border-slate-100">
                    {isApproved ? (
                      <div className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Completed & Rewarded</span>
                      </div>
                    ) : isPending ? (
                      <div className="w-full py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Submitted & Pending Verification</span>
                      </div>
                    ) : isRejected ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOpenSubmit(task)}
                        className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Re-Submit Screenshot (SS)</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOpenSubmit(task)}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Submit Proof Screenshot (SS)</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* SUBMIT MODAL (White Theme) WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedTask(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <Upload className="w-5 h-5 text-blue-600" />
                <span>Submit Task Proof (SS)</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Upload screenshot proof for: <strong>{selectedTask.title}</strong>
              </p>

              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Screenshot (SS) File
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:border-blue-400 transition">
                    <input
                      type="file"
                      id="user-ss-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="user-ss-upload"
                      className="cursor-pointer flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-slate-900"
                    >
                      <Upload className="w-6 h-6 text-blue-600" />
                      <span className="text-xs font-medium">
                        {screenshotFile ? (
                          <span className="text-blue-600 font-semibold">{screenshotFile.name}</span>
                        ) : (
                          'Click to select screenshot from device'
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">Supports PNG, JPG, JPEG, WEBP</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Or Paste Direct Image URL
                  </label>
                  <input
                    type="url"
                    value={screenshotUrl}
                    onChange={(e) => {
                      setScreenshotUrl(e.target.value);
                      setScreenshotFile(null);
                      setPreviewImage(e.target.value);
                    }}
                    placeholder="https://... image link"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                {previewImage && (
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-1">Preview:</p>
                    <div className="h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                      <img src={previewImage} alt="SS Preview" className="h-full object-contain" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Optional Notes for Verification
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. My social media handle is @gaurang_p"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTask(null)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting...' : 'Upload & Submit'}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL SCREENSHOT LIGHTBOX */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-screen"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-10 right-0 text-white p-2 text-sm font-bold bg-slate-800 rounded-full cursor-pointer"
              >
                ✕ Close
              </button>
              <img
                src={lightboxImage}
                alt="Proof Preview"
                className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl bg-white p-2"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

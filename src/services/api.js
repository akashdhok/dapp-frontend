const API_BASE_URL = 'http://localhost:5050/api';

const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

export const api = {
  // Auth
  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // Upload
  uploadImage: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(true),
      body: formData,
    });
    return handleResponse(res);
  },

  // Admin APIs
  admin: {
    getDashboardStats: async () => {
      const res = await fetch(`${API_BASE_URL}/admin/dashboard-stats`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    getUsers: async (status = 'all', search = '') => {
      let url = `${API_BASE_URL}/admin/users?status=${status}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const res = await fetch(url, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    updateUserStatus: async (userId, status) => {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      return handleResponse(res);
    },

    getTasks: async () => {
      const res = await fetch(`${API_BASE_URL}/admin/tasks`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    createTask: async (formDataOrJson, isMultipart = false) => {
      const res = await fetch(`${API_BASE_URL}/admin/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(isMultipart),
        body: isMultipart ? formDataOrJson : JSON.stringify(formDataOrJson),
      });
      return handleResponse(res);
    },

    deleteTask: async (taskId) => {
      const res = await fetch(`${API_BASE_URL}/admin/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    getSubmissions: async (status = 'all') => {
      const res = await fetch(`${API_BASE_URL}/admin/submissions?status=${status}`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    updateSubmissionStatus: async (submissionId, status, adminRemark = '') => {
      const res = await fetch(`${API_BASE_URL}/admin/submissions/${submissionId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, adminRemark }),
      });
      return handleResponse(res);
    },

    getPackages: async () => {
      const res = await fetch(`${API_BASE_URL}/admin/packages`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    createPackage: async (packageData) => {
      const res = await fetch(`${API_BASE_URL}/admin/packages`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(packageData),
      });
      return handleResponse(res);
    },

    deletePackage: async (packageId) => {
      const res = await fetch(`${API_BASE_URL}/admin/packages/${packageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
  },

  // User APIs
  user: {
    getDashboard: async () => {
      const res = await fetch(`${API_BASE_URL}/user/dashboard`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    getPackages: async () => {
      const res = await fetch(`${API_BASE_URL}/user/packages`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    purchasePackage: async (packageId) => {
      const res = await fetch(`${API_BASE_URL}/user/purchase-package/${packageId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    getTasks: async () => {
      const res = await fetch(`${API_BASE_URL}/user/tasks`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    submitTaskProof: async (taskId, formDataOrJson, isMultipart = false) => {
      const res = await fetch(`${API_BASE_URL}/user/tasks/${taskId}/submit`, {
        method: 'POST',
        headers: getAuthHeaders(isMultipart),
        body: isMultipart ? formDataOrJson : JSON.stringify(formDataOrJson),
      });
      return handleResponse(res);
    },

    getSubmissions: async () => {
      const res = await fetch(`${API_BASE_URL}/user/submissions`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },

    getReferrals: async () => {
      const res = await fetch(`${API_BASE_URL}/user/referrals`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(res);
    },
  },
};

export const getAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `http://localhost:5050${url}`;
  }
  return `http://localhost:5050/${url}`;
};


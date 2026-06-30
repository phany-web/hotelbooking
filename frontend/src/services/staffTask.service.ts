import api from "./axios";

// ADMIN
export const getAllTasks = async () => {
  const res = await api.get("/staff-tasks");
  return res.data.data;
};

// STAFF
export const getMyTasks = async () => {
  const res = await api.get("/staff-tasks/my-tasks");
  return res.data.data;
};

// CREATE
export const createTask = async (data: {
  title: string;
  description?: string;
  roomId: string;
  staffId: string;
}) => {
  const res = await api.post("/staff-tasks", data);
  return res.data.data;
};

// UPDATE STATUS
export const updateTaskStatus = async (id: string, status: string) => {
  const res = await api.patch(`/staff-tasks/${id}`, {
    status,
  });

  return res.data.data;
};

// START
export const startTask = async (id: string) => {
  const res = await api.patch(`/staff-tasks/${id}/start`);

  return res.data.data;
};

// COMPLETE
export const completeTask = async (id: string) => {
  const res = await api.patch(`/staff-tasks/${id}/complete`);

  return res.data.data;
};

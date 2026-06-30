import { useEffect, useState } from "react";
import axios from "../../services/axios";
import AdminLayout from "../../layouts/AdminLayout";

type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  room: {
    id: string;
    roomNumber: string;
  };
  createdAt: string;
};

const StaffTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/staff-tasks/my-tasks");

      setTasks(res.data.data);
    } catch (err) {
      console.log("Fetch tasks error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const startTask = async (id: string) => {
    try {
      await axios.patch(`/staff-tasks/${id}/start`);
      fetchTasks();
    } catch (err) {
      console.log("Start task error:", err);
    }
  };

  const completeTask = async (id: string) => {
    try {
      await axios.patch(`/staff-tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      console.log("Complete task error:", err);
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Tasks
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your cleaning & room tasks
        </p>

        {loading ? (
          <div className="mt-6 text-gray-500">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            No tasks assigned yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    {task.title}
                  </h2>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>

                {/* ROOM INFO */}
                <p className="text-gray-500 mt-2 text-sm">
                  Room: {task.room?.roomNumber}
                </p>

                {/* DESCRIPTION */}
                {task.description && (
                  <p className="text-gray-600 mt-2 text-sm">
                    {task.description}
                  </p>
                )}

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4">
                  {task.status === "PENDING" && (
                    <button
                      onClick={() => startTask(task.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Start
                    </button>
                  )}

                  {task.status === "IN_PROGRESS" && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Complete
                    </button>
                  )}

                  {task.status === "COMPLETED" && (
                    <span className="text-green-600 text-sm font-medium">
                      Finished ✔
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default StaffTasks;
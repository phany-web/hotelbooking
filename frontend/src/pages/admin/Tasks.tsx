import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import { getAllTasks, createTask } from "../../services/staffTask.service";

import { getStaffs } from "../../services/staff.service";
import { getAllRooms } from "../../services/room.service";

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    roomId: "",
    staffId: "",
  });

  const loadData = async () => {
    try {
      const [taskData, staffData, roomData] = await Promise.all([
        getAllTasks(),
        getStaffs(),
        getAllRooms(),
      ]);

      setTasks(taskData || []);
      setStaffs(staffData || []);
      setRooms(roomData || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleStaffChange = (staffId: string) => {
    setForm((prev) => ({
      ...prev,
      staffId,
      roomId: "",
    }));

    const selectedStaff = staffs.find((staff: any) => staff.id === staffId);

    if (!selectedStaff) {
      setFilteredRooms([]);
      return;
    }

    const hotelRooms = rooms.filter(
      (room: any) => room.hotelId === selectedStaff.hotelId,
    );

    setFilteredRooms(hotelRooms);
  };
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask(form);

      setForm({
        title: "",
        description: "",
        roomId: "",
        staffId: "",
      });

      setOpen(false);

      loadData();
    } catch (error) {
      console.log(error);
      alert("Failed to create task");
    }
  };

  const badgeStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <AdminLayout>
      <div className="p-6">
        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Staff Tasks</h1>

            <p className="text-slate-500">
              Assign cleaning & maintenance tasks
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="
              px-5 py-3
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
            "
          >
            + Create Task
          </button>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">Total Tasks</p>

            <h2 className="text-3xl font-bold mt-2">{tasks.length}</h2>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-5">
            <p className="text-yellow-700 text-sm">Pending</p>

            <h2 className="text-3xl font-bold">
              {tasks.filter((t) => t.status === "PENDING").length}
            </h2>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-blue-700 text-sm">In Progress</p>

            <h2 className="text-3xl font-bold">
              {tasks.filter((t) => t.status === "IN_PROGRESS").length}
            </h2>
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-green-700 text-sm">Completed</p>

            <h2 className="text-3xl font-bold">
              {tasks.filter((t) => t.status === "COMPLETED").length}
            </h2>
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Task</th>

                <th className="p-4 text-left">Room</th>

                <th className="p-4 text-left">Staff</th>

                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="
                    border-t
                    hover:bg-slate-50
                  "
                >
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{task.title}</p>

                      <p className="text-sm text-slate-500">
                        {task.description}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">{task.room?.roomNumber}</td>

                  <td className="p-4">{task.staff?.fullName}</td>

                  <td className="p-4">
                    <span
                      className={`
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${badgeStyle(task.status)}
                      `}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tasks.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No Tasks Found
            </div>
          )}
        </div>

        {/* MODAL */}

        {open && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <form
              onSubmit={handleCreate}
              className="
                bg-white
                w-full
                max-w-lg
                rounded-3xl
                p-6
                space-y-4
              "
            >
              <h2 className="text-xl font-bold">Create Task</h2>

              <input
                className={inputStyle}
                placeholder="Task Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                className={inputStyle}
                placeholder="Description"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

              <select
                value={form.staffId}
                onChange={(e) => handleStaffChange(e.target.value)}
              >
                <option value="">Select Staff</option>

                {staffs.map((staff: any) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.fullName} - {staff.hotel?.hotelName}
                  </option>
                ))}
              </select>

              <select
                value={form.roomId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    roomId: e.target.value,
                  })
                }
              >
                <option value="">Select Room</option>

                {filteredRooms.map((room: any) => (
                  <option key={room.id} value={room.id}>
                    Room {room.roomNumber}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-slate-100
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-blue-600
                    text-white
                  "
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Tasks;

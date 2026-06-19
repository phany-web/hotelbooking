import { useState } from "react";
import { createAdmin } from "../services/admin.service";

interface Props {
  onSuccess: () => void;
}

const CreateAdminForm = ({ onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createAdmin(formData);
      alert("Admin created successfully");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
      });

      onSuccess();
    } catch (error: any) {
      alert(error.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Create Admin</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Admin"}
      </button>
    </form>
  );
};

export default CreateAdminForm;

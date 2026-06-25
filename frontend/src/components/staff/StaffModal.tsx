import { useEffect, useState } from "react";

import { createStaff } from "../../services/staff.service";
import { getAllHotels } from "../../services/hotel.service";

interface Props {
onClose: () => void;
onSuccess: () => void;
}

const StaffModal = ({
onClose,
onSuccess,
}: Props) => {
const [hotels, setHotels] =
useState<any[]>([]);

const [formData, setFormData] =
useState({
fullName: "",
email: "",
phone: "",
password: "",
hotelId: "",
});

useEffect(() => {
loadHotels();
}, []);

const loadHotels = async () => {
try {
const data =
await getAllHotels();

  setHotels(data);
} catch (error) {
  console.log(error);
}

};

const handleSubmit = async (
e: React.FormEvent
) => {
e.preventDefault();


try {
  await createStaff(formData);

  alert(
    "Staff created successfully"
  );

  onSuccess();
  onClose();
} catch (error: any) {
  console.log(error);

  alert(
    error?.response?.data
      ?.message ||
      "Failed to create staff"
  );
}

};

return ( <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"> <div className="bg-white p-6 rounded-xl w-full max-w-lg"> <h2 className="text-xl font-bold mb-4">
Add Staff </h2>

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-3 rounded"
        value={formData.fullName}
        onChange={(e) =>
          setFormData({
            ...formData,
            fullName:
              e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Phone"
        className="w-full border p-3 rounded"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password:
              e.target.value,
          })
        }
      />

      <select
        className="w-full border p-3 rounded"
        value={formData.hotelId}
        onChange={(e) =>
          setFormData({
            ...formData,
            hotelId:
              e.target.value,
          })
        }
      >
        <option value="">
          Select Hotel
        </option>

        {hotels.map((hotel) => (
          <option
            key={hotel.id}
            value={hotel.id}
          >
            {hotel.hotelName}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Staff
        </button>
      </div>
    </form>
  </div>
</div>

);
};

export default StaffModal;

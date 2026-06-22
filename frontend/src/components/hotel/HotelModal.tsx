import { useState } from "react";

import { createHotel, updateHotel } from "../../services/hotel.service";

interface Props {
  hotel?: any;

  onClose: () => void;

  onSuccess: () => void;
}

const HotelModal = ({ hotel, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    hotelName: hotel?.hotelName || "",

    description: hotel?.description || "",

    address: hotel?.address || "",

    location: hotel?.location || "",

    phone: hotel?.phone || "",

    email: hotel?.email || "",

    imageUrl: hotel?.images?.[0]?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        hotelName: formData.hotelName,

        description: formData.description,

        address: formData.address,

        location: formData.location,

        phone: formData.phone,

        email: formData.email,

        images: [formData.imageUrl],
      };

      if (hotel) {
        await updateHotel(hotel.id, payload);
      } else {
        await createHotel(payload);
      }

      onSuccess();

      onClose();
    } catch (error: any) {
      console.log(error);

      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[700px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {hotel ? "Edit Hotel" : "Create Hotel"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Hotel Name"
            className="w-full border p-3 rounded"
            value={formData.hotelName}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelName: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded"
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Address"
            className="w-full border p-3 rounded"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full border p-3 rounded"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
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
            placeholder="Image URL"
            className="w-full border p-3 rounded"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({
                ...formData,
                imageUrl: e.target.value,
              })
            }
          />

          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="preview"
              className="w-full h-48 object-cover rounded"
            />
          )}

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
              {hotel ? "Update Hotel" : "Create Hotel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelModal;
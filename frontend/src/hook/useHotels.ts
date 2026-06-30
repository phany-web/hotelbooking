import { useEffect, useState } from "react";
import { getHotels } from "../services/hotel.service";

export interface Hotel {
  id: string;
  hotelName: string;
  address: string;
  location: string;
  phone?: string;
  email?: string;
  images?: { imageUrl: string }[];
}

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await getHotels();

      setHotels(res.data); // 👈 because backend returns { success, data }
    } catch (err: any) {
      setError(err.message || "Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return { hotels, loading, error, refetch: fetchHotels };
};
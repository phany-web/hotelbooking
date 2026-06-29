export interface HotelImage {
  id: string;
  imageUrl: string;
}

export interface RoomType {
  id: string;
  typeName: string;
  maxOccupancy: number;
}

export interface Room {
  id: string;
  roomNumber: string;
  floorNumber: number | null;
  price: number;
  status: "AVAILABLE" | "OCCUPIED" | "DIRTY" | "CLEANING" | "MAINTENANCE";

  roomType: RoomType;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;

  user: {
    fullName: string;
  };
}

export interface Hotel {
  id: string;
  hotelName: string;
  description: string | null;

  address: string;
  location: string;

  phone: string | null;
  email: string | null;

  averageRating: number;
  totalReviews: number;

  images: HotelImage[];

  rooms: Room[];

  reviews: Review[];
}

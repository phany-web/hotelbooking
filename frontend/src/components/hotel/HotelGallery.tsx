interface HotelImage {
  id: string;
  imageUrl: string;
}

interface Props {
  images: HotelImage[];
  hotelName: string;
}

const HotelGallery = ({ images, hotelName }: Props) => {
  const cover =
    images.length > 0
      ? images[0].imageUrl
      : "https://placehold.co/1200x600?text=No+Image";

  return (
    <div className="space-y-4">
      <img
        src={cover}
        alt={hotelName}
        className="w-full h-[420px] rounded-xl object-cover"
      />

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(1).map((image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt=""
              className="h-28 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelGallery;

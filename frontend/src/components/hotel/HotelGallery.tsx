interface Props {
  images: { imageUrl: string }[];
}

const HotelGallery = ({ images }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-2 h-100 overflow-hidden">
      {images.slice(0, 3).map((img, index) => (
        <img
          key={index}
          src={img.imageUrl}
          className="w-full h-full object-cover rounded-lg"
        />
      ))}
    </div>
  );
};

export default HotelGallery;
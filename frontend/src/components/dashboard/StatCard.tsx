interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
};

export default StatCard;

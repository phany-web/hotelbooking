import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import CustomerTable from "../../components/customer/CustomerTable";

import { getHotelCustomers } from "../../services/customer.service";

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const data = await getHotelCustomers();

      setCustomers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <AdminLayout>
      {" "}
      <h1 className="text-3xl font-bold mb-6">Customers </h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CustomerTable customers={customers} />
      )}
    </AdminLayout>
  );
};

export default Customers;

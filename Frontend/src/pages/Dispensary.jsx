import React, { useEffect } from "react";
import MedicineCard from '../components/MedicineCard';
import { useDispatch, useSelector } from "react-redux";
import { getMedicines } from "../store/slices/mediSlice";

const Dispensary = () => {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.med.medicines);

  useEffect(() => {
    const fetchMedicines = async () => {
      dispatch(getMedicines());
    };
    fetchMedicines();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Our Medicines</h1>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {medicines.map((item) => (
          <MedicineCard key={item._id} medicine={item} />
        ))}
      </div>
    </div>
  );
};

export default Dispensary;

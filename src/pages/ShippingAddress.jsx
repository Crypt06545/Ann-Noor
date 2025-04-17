import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaCity, FaFlag, FaPhoneAlt, FaMapPin, FaChevronDown } from 'react-icons/fa';

const ShippingAddress = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);

  const onSubmit = data => {
    console.log(data);
  };

  const bangladeshDistricts = [
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur",
    "Chapai Nawabganj", "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar", "Dhaka", "Dinajpur",
    "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
    "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram",
    "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
    "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
    "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur",
    "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
  ];
  

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <div className="max-w-3xl mx-auto bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-amber-500 mb-6">Shipping Address</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* First Name */}
          <div>
            <label className="block text-amber-500 mb-1">First Name</label>
            <div className="flex items-center bg-zinc-700 p-2 rounded-md">
              <FaUser className="text-amber-500 mr-2" />
              <input
                {...register("firstName", { required: "First name is required" })}
                type="text"
                className="bg-transparent text-white w-full outline-none"
                placeholder="John"
              />
            </div>
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-amber-500 mb-1">Last Name</label>
            <div className="flex items-center bg-zinc-700 p-2 rounded-md">
              <FaUser className="text-amber-500 mr-2" />
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                className="bg-transparent text-white w-full outline-none"
                placeholder="Doe"
              />
            </div>
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-amber-500 mb-1">Email (Optional)</label>
            <div className="flex items-center bg-zinc-700 p-2 rounded-md">
              <FaEnvelope className="text-amber-500 mr-2" />
              <input
                {...register("email")}
                type="email"
                className="bg-transparent text-white w-full outline-none"
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* District Dropdown */}
          <div className="relative">
            <label className="block text-amber-500 mb-1">District</label>
            <div 
              className="flex items-center bg-zinc-700 p-2 rounded-md relative cursor-pointer"
              onClick={() => setIsDistrictOpen(!isDistrictOpen)}
            >
              <FaCity className="text-amber-500 mr-2" />
              <input
                {...register("city", { required: "District is required" })}
                type="hidden"
                id="districtInput"
              />
              <span id="districtDisplay" className="text-white flex-grow">Select a district</span>
              <FaChevronDown className={`text-amber-500 transition-transform ${isDistrictOpen ? 'transform rotate-180' : ''}`} />
            </div>
            
            {isDistrictOpen && (
              <div className="absolute z-10 w-full mt-1 bg-zinc-700 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                {bangladeshDistricts.map(district => (
                  <div
                    key={district}
                    className="px-4 py-2 text-white hover:bg-amber-500 hover:text-black cursor-pointer"
                    onClick={() => {
                      document.getElementById('districtDisplay').textContent = district;
                      document.getElementById('districtInput').value = district;
                      setIsDistrictOpen(false);
                    }}
                  >
                    {district}
                  </div>
                ))}
              </div>
            )}
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
          </div>
          {/* Address */}
        <div className="md:col-span-2">
            <label className="block text-amber-500 mb-1">Full Address</label>
            <div className="flex items-start bg-zinc-700 p-2 rounded-md">
            <FaMapPin className="text-amber-500 mt-1 mr-2" />
            <textarea
             {...register("address", { required: "Address is required" })}
            rows={3}
            placeholder="House #, Road #, Area, etc."
            className="bg-transparent text-white w-full outline-none resize-none"
            />
            </div>
            {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
        </div>


          {/* Zip Code */}
          <div>
            <label className="block text-amber-500 mb-1">Zip Code</label>
            <div className="flex items-center bg-zinc-700 p-2 rounded-md">
              <FaMapPin className="text-amber-500 mr-2" />
              <input
                {...register("zipcode", { required: "Zip code is required" })}
                type="text"
                className="bg-transparent text-white w-full outline-none"
                placeholder="1000"
              />
            </div>
            {errors.zipcode && <p className="text-red-400 text-sm mt-1">{errors.zipcode.message}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block text-amber-500 mb-1">Country</label>
            <div className="flex items-center bg-zinc-700 p-2 rounded-md">
              <FaFlag className="text-amber-500 mr-2" />
              <input
                {...register("country")}
                type="text"
                className="bg-transparent text-white w-full outline-none"
                value="Bangladesh"
                readOnly
              />
            </div>
          </div>

          {/* Phone */}
          <div className="md:col-span-2">
            <label className="block text-amber-500 mb-1">Phone</label>
            <div className="flex items-center bg-zinc-700 p-2 rounded-md">
              <FaPhoneAlt className="text-amber-500 mr-2" />
              <input
                {...register("phone", { required: "Phone is required" })}
                type="tel"
                className="bg-transparent text-white w-full outline-none"
                placeholder="+8801XXXXXXXXX"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useGetAllEmployeesQuery, useDeleteEmployeeMutation } from "../../redux/api/employees";
// import { FaSearch } from "react-icons/fa"; // Import the search icon

// const AdminEmployeesList = () => {
//   const { data: employees } = useGetAllEmployeesQuery();
//   const [deleteEmployee] = useDeleteEmployeeMutation();
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleDeleteEmployee = async (employeeId) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await deleteEmployee(employeeId).unwrap();
//         alert("Employee deleted successfully.");
//       } catch (error) {
//         alert("Failed to delete employee: " + error.message);
//       }
//     }
//   };

//   // Filter employees based on the search term
//   const filteredEmployees = employees?.filter((employee) =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-[9rem] mt-20">
//       <div className="p-3">
//         <div className="flex justify-between items-center mb-4">
//           <div className="ml-[2rem] text-xl font-bold h-12">
//             All Employees ({filteredEmployees?.length})
//           </div>

//           {/* Search Bar */}
//           <div className="relative w-1/3">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border border-gray-300 rounded-md px-10 py-2 w-full shadow-md focus:outline-none focus:ring focus:ring-blue-300 transition"
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto mt-4">
//           <table className="min-w-full border-collapse border border-gray-400">
//             <thead className="bg-blue-200">
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">Unique ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Image</th>
//                 <th className="border border-gray-300 px-4 py-2">Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Email</th>
//                 <th className="border border-gray-300 px-4 py-2">Mobile No</th>
//                 <th className="border border-gray-300 px-4 py-2">Designation</th>
//                 <th className="border border-gray-300 px-4 py-2">Gender</th>
//                 <th className="border border-gray-300 px-4 py-2">Course</th>
//                 <th className="border border-gray-300 px-4 py-2">Create Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEmployees?.map((employee, index) => (
//                 <tr key={employee._id} className="hover:bg-green-100">
//                   <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <img
//                       src={employee.image}
//                       alt={employee.name}
//                       className="w-16 h-16 object-cover mx-auto"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">{employee.name}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     <a href={`mailto:${employee.email}`} className="text-blue-500 underline">
//                       {employee.email}
//                     </a>
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {employee.mobileNo}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {employee.designation}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {employee.gender === 'M' ? 'Male' : 'Female'}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {employee.course.join(', ')}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {new Date(employee.createdAt).toLocaleDateString('en-GB', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric',
//                     })}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     <Link to={`/admin/employees/update/${employee._id}`} className="text-blue-500">
//                       Edit
//                     </Link>
//                     <span className="mx-2">|</span>
//                     <button
//                       className="text-red-500"
//                       onClick={() => handleDeleteEmployee(employee._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminEmployeesList;


import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllEmployeesQuery, useDeleteEmployeeMutation } from "../../redux/api/employees";
import { FaSearch } from "react-icons/fa";

const AdminEmployeesList = () => {
  const { data: employees } = useGetAllEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [searchGender, setSearchGender] = useState("");

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(employeeId).unwrap();
        alert("Employee deleted successfully.");
      } catch (error) {
        alert("Failed to delete employee: " + error.message);
      }
    }
  };

  // Filter employees based on search criteria
  const filteredEmployees = employees?.filter((employee) => {
    const nameMatch = employee.name.toLowerCase().includes(searchName.toLowerCase());
    const emailMatch = employee.email.toLowerCase().includes(searchEmail.toLowerCase());
    const designationMatch = searchDesignation
      ? employee.designation.toLowerCase() === searchDesignation.toLowerCase()
      : true;
    const genderMatch = searchGender ? employee.gender.toLowerCase() === searchGender.toLowerCase() : true;

    return nameMatch && emailMatch && designationMatch && genderMatch;
  });

  return (
    <div className="container mx-[9rem] mt-20">
      <div className="p-3">
        <div className="flex justify-between items-center mb-6">
          <div className="ml-[2rem] text-2xl font-bold h-12">
            All Employees ({filteredEmployees?.length})
          </div>

          <div className="flex space-x-4">
            {/* Search by Name */}
            <div className="relative w-1/3">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full shadow-md focus:outline-none focus:ring focus:ring-blue-300 transition bg-white"
              />
            </div>

            {/* Search by Email */}
            <div className="relative w-1/3">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="border border-gray-300 rounded-md pl-10 py-2 w-full shadow-md focus:outline-none focus:ring focus:ring-blue-300 transition bg-white"
              />
            </div>

            {/* Search by Designation */}
            <div className="relative w-1/3">
              <select
                value={searchDesignation}
                onChange={(e) => setSearchDesignation(e.target.value)}
                className="border border-gray-300 rounded-md pl-3 py-2 w-full shadow-md focus:outline-none focus:ring focus:ring-blue-300 transition bg-white text-gray-700"
              >
                <option value="">All Designations</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
                {/* Add more designations if needed */}
              </select>
            </div>

            {/* Search by Gender */}
            <div className="relative w-1/3">
              <select
                value={searchGender}
                onChange={(e) => setSearchGender(e.target.value)}
                className="border border-gray-300 rounded-md pl-3 py-2 w-full shadow-md focus:outline-none focus:ring focus:ring-blue-300 transition bg-white text-gray-700"
              >
                <option value="">All Genders</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-400">
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Unique ID</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Mobile No</th>
                <th className="border border-gray-300 px-4 py-2">Designation</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">Course</th>
                <th className="border border-gray-300 px-4 py-2">Create Date</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees?.map((employee, index) => (
                <tr key={employee._id} className="hover:bg-green-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{employee.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a href={`mailto:${employee.email}`} className="text-blue-500 underline">
                      {employee.email}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {employee.mobileNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {employee.designation}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {employee.gender === 'M' ? 'Male' : 'Female'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {employee.course.join(', ')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(employee.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Link to={`/admin/employees/update/${employee._id}`} className="text-blue-500">
                      Edit
                    </Link>
                    <span className="mx-2">|</span>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteEmployee(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeesList;

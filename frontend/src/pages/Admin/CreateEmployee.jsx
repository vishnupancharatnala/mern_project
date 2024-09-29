// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCreateEmployeeMutation, useUploadImageMutation } from "../../redux/api/employees.js";
// import { toast } from "react-toastify";

// const CreateEmployee = () => {
//   const navigate = useNavigate();

//   const [employeeData, setEmployeeData] = useState({
//     name: "",
//     email: "",
//     mobileNo: "",
//     designation: "HR",  // Default value for dropdown
//     gender: "M",        // Default value for radio button
//     course: [],         // Array of selected courses
//     image: null,
//   });

//   const [selectedImage, setSelectedImage] = useState(null);

//   const [createEmployee, { isLoading: isCreatingEmployee, error: createEmployeeErrorDetail }] = useCreateEmployeeMutation();
//   const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleCreateEmployee = async () => {
//     try {
//       if (
//         !employeeData.name ||
//         !employeeData.email ||
//         !employeeData.mobileNo ||
//         !employeeData.designation ||
//         !employeeData.gender ||
//         !employeeData.course.length ||  // Ensure at least one course is selected
//         !selectedImage
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       let uploadedImagePath = null;

//       if (selectedImage) {
//         const formData = new FormData();
//         formData.append("image", selectedImage);

//         const uploadImageResponse = await uploadImage(formData);

//         if (uploadImageResponse.data) {
//           uploadedImagePath = uploadImageResponse.data.image;
//         } else {
//           console.error("Failed to upload image: ", uploadImageErrorDetails);
//           toast.error("Failed to upload image");
//           return;
//         }

//         await createEmployee({
//           ...employeeData,
//           image: uploadedImagePath,
//         });

//         navigate("/admin/employees-list");

//         setEmployeeData({
//           name: "",
//           email: "",
//           mobileNo: "",
//           designation: "HR",  // Reset to default
//           gender: "M",        // Reset to default
//           course: [],         // Clear course selections
//           image: null,
//         });

//         toast.success("Employee Added To Database");
//       }
//     } catch (error) {
//       console.error("Failed to create Employee: ", createEmployeeErrorDetail);
//       toast.error(`Failed to create Employee: ${createEmployeeErrorDetail?.message}`);
//     }
//   };

//   const handleCourseChange = (e) => {
//     const { value, checked } = e.target;
//     setEmployeeData((prevState) => {
//       const updatedCourses = checked
//         ? [...prevState.course, value]
//         : prevState.course.filter((course) => course !== value);
//       return { ...prevState, course: updatedCourses };
//     });
//   };

//   return (
//     <div className="container flex justify-center items-center mt-20">
//       <form>
//         <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Employee</p>

//         <div className="mb-4">
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={employeeData.name}
//               onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>

//         <div className="mb-4">
//           <label className="block">
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={employeeData.email}
//               onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>

//         <div className="mb-4">
//           <label className="block">
//             Mobile No:
//             <input
//               type="text"
//               name="mobileNo"
//               value={employeeData.mobileNo}
//               onChange={(e) => setEmployeeData({ ...employeeData, mobileNo: e.target.value })}
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>

//         <div className="mb-4">
//           <label className="block">
//             Designation:
//             <select
//               name="designation"
//               value={employeeData.designation}
//               onChange={(e) => setEmployeeData({ ...employeeData, designation: e.target.value })}
//               className="border px-2 py-1 w-full"
//             >
//               <option value="HR">HR</option>
//               <option value="Manager">Manager</option>
//               <option value="Sales">Sales</option>
//             </select>
//           </label>
//         </div>

//         <div className="mb-4">
//           <label className="block">
//             Gender:
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="M"
//                   checked={employeeData.gender === "M"}
//                   onChange={(e) => setEmployeeData({ ...employeeData, gender: e.target.value })}
//                 />
//                 Male
//               </label>
//               <label className="ml-4">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="F"
//                   checked={employeeData.gender === "F"}
//                   onChange={(e) => setEmployeeData({ ...employeeData, gender: e.target.value })}
//                 />
//                 Female
//               </label>
//             </div>
//           </label>
//         </div>

//         <div className="mb-4">
//           <label className="block">
//             Course:
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="MCA"
//                   checked={employeeData.course.includes("MCA")}
//                   onChange={handleCourseChange}
//                 />
//                 MCA
//               </label>
//               <label className="ml-4">
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="BCA"
//                   checked={employeeData.course.includes("BCA")}
//                   onChange={handleCourseChange}
//                 />
//                 BCA
//               </label>
//               <label className="ml-4">
//                 <input
//                   type="checkbox"
//                   name="course"
//                   value="BSC"
//                   checked={employeeData.course.includes("BSC")}
//                   onChange={handleCourseChange}
//                 />
//                 BSC
//               </label>
//             </div>
//           </label>
//         </div>

//         <div className="mb-4">
//           <label
//             style={
//               !selectedImage
//                 ? {
//                     border: "1px solid #888",
//                     borderRadius: "5px",
//                     padding: "8px",
//                   }
//                 : {
//                     border: "0",
//                     borderRadius: "0",
//                     padding: "0",
//                   }
//             }
//           >
//             {!selectedImage && "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: !selectedImage ? "none" : "block" }}
//             />
//           </label>
//         </div>

//         <button
//           type="button"
//           onClick={handleCreateEmployee}
//           className="bg-teal-500 text-white px-4 py-2 rounded"
//           disabled={isCreatingEmployee || isUploadingImage}
//         >
//           {isCreatingEmployee || isUploadingImage ? "Creating..." : "Create Employee"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEmployee;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateEmployeeMutation, useUploadImageMutation } from "../../redux/api/employees.js";
import { toast } from "react-toastify";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "HR",  // Default value for dropdown
    gender: "M",        // Default value for radio button
    course: [],         // Array of selected courses
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createEmployee, { isLoading: isCreatingEmployee, error: createEmployeeError }] = useCreateEmployeeMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageError }] = useUploadImageMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateEmployee = async () => {
    try {
      if (
        !employeeData.name ||
        !employeeData.email ||
        !employeeData.mobileNo ||
        !employeeData.designation ||
        !employeeData.gender ||
        !employeeData.course.length ||  // Ensure at least one course is selected
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageError);
          toast.error("Failed to upload image");
          return;
        }
      }

      const createEmployeeResponse = await createEmployee({
        ...employeeData,
        image: uploadedImagePath,
      });

      // Check for duplicate email error
      if (createEmployeeError) {
        if (createEmployeeError.status === 400) { // Assuming the server responds with a 409 status code for duplicates
          toast.error("Email already exists. Please use a different email.");
        } else {
          toast.error(`Failed to create Employee: ${createEmployeeError.message}`);
        }
        return;
      }

      navigate("/admin/employees-list");

      setEmployeeData({
        name: "",
        email: "",
        mobileNo: "",
        designation: "HR",  // Reset to default
        gender: "M",        // Reset to default
        course: [],         // Clear course selections
        image: null,
      });

      toast.success("Employee Added To Database");

    } catch (error) {
      console.error("Failed to create Employee: ", error);
      toast.error(`Failed to create Employee: ${error.message}`);
    }
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setEmployeeData((prevState) => {
      const updatedCourses = checked
        ? [...prevState.course, value]
        : prevState.course.filter((course) => course !== value);
      return { ...prevState, course: updatedCourses };
    });
  };

  return (
    <div className="container flex justify-center items-center mt-20">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Employee</p>

        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Email:
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Mobile No:
            <input
              type="text"
              name="mobileNo"
              value={employeeData.mobileNo}
              onChange={(e) => setEmployeeData({ ...employeeData, mobileNo: e.target.value })}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Designation:
            <select
              name="designation"
              value={employeeData.designation}
              onChange={(e) => setEmployeeData({ ...employeeData, designation: e.target.value })}
              className="border px-2 py-1 w-full"
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Gender:
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={employeeData.gender === "M"}
                  onChange={(e) => setEmployeeData({ ...employeeData, gender: e.target.value })}
                />
                Male
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={employeeData.gender === "F"}
                  onChange={(e) => setEmployeeData({ ...employeeData, gender: e.target.value })}
                />
                Female
              </label>
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Course:
            <div>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={employeeData.course.includes("MCA")}
                  onChange={handleCourseChange}
                />
                MCA
              </label>
              <label className="ml-4">
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={employeeData.course.includes("BCA")}
                  onChange={handleCourseChange}
                />
                BCA
              </label>
              <label className="ml-4">
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={employeeData.course.includes("BSC")}
                  onChange={handleCourseChange}
                />
                BSC
              </label>
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateEmployee}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isCreatingEmployee || isUploadingImage}
        >
          {isCreatingEmployee || isUploadingImage ? "Creating..." : "Create Employee"}
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;

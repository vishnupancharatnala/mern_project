import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificEmployeeQuery,
  useUpdateEmployeeMutation,
  useUploadImageMutation,
} from "../../redux/api/employees";
import { toast } from "react-toastify";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "HR", // Default value for dropdown
    gender: "M", // Default value for radio button
    course: [], // Array of selected courses
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialEmployeeData } = useGetSpecificEmployeeQuery(id);

  useEffect(() => {
    if (initialEmployeeData) {
      setEmployeeData(initialEmployeeData);
    }
  }, [initialEmployeeData]);

  const [updateEmployee, { isLoading: isUpdatingEmployee }] = useUpdateEmployeeMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateEmployee = async () => {
    try {
      if (
        !employeeData.name ||
        !employeeData.email ||
        !employeeData.mobileNo ||
        !employeeData.designation ||
        !employeeData.gender ||
        !employeeData.course.length // Ensure at least one course is selected
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = employeeData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateEmployee({
        id: id,
        updatedEmployee: {
          ...employeeData,
          image: uploadedImagePath,
        },
      });

      navigate("/admin/employees-list");
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error("Failed to update employee: ", error);
      toast.error(`Failed to update employee: ${error?.message}`);
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
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Employee</p>

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
          onClick={handleUpdateEmployee}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isUpdatingEmployee || isUploadingImage}
        >
          {isUpdatingEmployee || isUploadingImage ? "Updating..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;

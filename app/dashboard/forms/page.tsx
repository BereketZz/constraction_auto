"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { db } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "@/components/DeafultLayout";
import {
  updateDoc,
  onSnapshot,
  setDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
interface FormState {
  jobDescription: string;
  name: string;
  profession: string;
  numberOfAssistants: string;
  measuredOutputPerDay: string;
  unitOfMeasurement: string;
  expectedOutput: string;
  dailyPaymentProfessional: string;
  dailyPaymentAssistant: string;
}

const professions = [
  "Labor",
  "Site Engineer",
  "Foreman",
  "Architect",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Mason",
];

const JobForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    jobDescription: "",
    name: "",
    profession: "",
    numberOfAssistants: "",
    measuredOutputPerDay: "",
    unitOfMeasurement: "",
    expectedOutput: "",
    dailyPaymentProfessional: "",
    dailyPaymentAssistant: "",
  });
  const [check, setCheck] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
    // Add your form submission logic here
    try {
      setCheck(true);
      await updateDoc(doc(db, "collector", "form"), {
        job: arrayUnion({
          id: uuid(),
          jobDescription: formData.jobDescription,
          name: formData.name,
          profession: formData.profession,
          numberOfAssistants: formData.numberOfAssistants,
          measuredOutputPerDay: formData.measuredOutputPerDay,
          unitOfMeasurement: formData.unitOfMeasurement,
          expectedOutput: formData.expectedOutput,
          dailyPaymentProfessional: formData.dailyPaymentProfessional,
          dailyPaymentAssistant: formData.dailyPaymentAssistant,
          date: Date.now(),
        }),
      });
      toast.success("Job uploaded successfully");
    } catch (error) {
      toast.success("Something went wrong!");
    } finally {
      setCheck(false);
    }
  };

  return (
    <DefaultLayout>


 
    <section className="bg-gray-50 min-ha-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Daily Job Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <input
              type="text"
              name="jobDescription"
              id="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="profession"
              className="block text-sm font-medium text-gray-700"
            >
              Profession
            </label>
            <select
              name="profession"
              id="profession"
              value={formData.profession}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            >
              <option value="">Select profession</option>
              {professions.map((profession) => (
                <option key={profession} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="numberOfAssistants"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Assistants
            </label>
            <input
              type="text"
              name="numberOfAssistants"
              id="numberOfAssistants"
              value={formData.numberOfAssistants}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="measuredOutputPerDay"
              className="block text-sm font-medium text-gray-700"
            >
              Measured Output Per Day
            </label>
            <input
              type="text"
              name="measuredOutputPerDay"
              id="measuredOutputPerDay"
              value={formData.measuredOutputPerDay}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="unitOfMeasurement"
              className="block text-sm font-medium text-gray-700"
            >
              Unit of Measurement
            </label>
            <input
              type="text"
              name="unitOfMeasurement"
              id="unitOfMeasurement"
              value={formData.unitOfMeasurement}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expectedOutput"
              className="block text-sm font-medium text-gray-700"
            >
              Expected Output
            </label>
            <input
              type="text"
              name="expectedOutput"
              id="expectedOutput"
              value={formData.expectedOutput}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dailyPaymentProfessional"
              className="block text-sm font-medium text-gray-700"
            >
              Daily Payment for Professional
            </label>
            <input
              type="text"
              name="dailyPaymentProfessional"
              id="dailyPaymentProfessional"
              value={formData.dailyPaymentProfessional}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dailyPaymentAssistant"
              className="block text-sm font-medium text-gray-700"
            >
              Daily Payment for Assistant
            </label>
            <input
              type="text"
              name="dailyPaymentAssistant"
              id="dailyPaymentAssistant"
              value={formData.dailyPaymentAssistant}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="font-normal text-[16px] text-white">
                {check ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Submitting ...
                  </>
                ) : (
                  "Submit"
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
    </DefaultLayout>
  );
};

export default JobForm;

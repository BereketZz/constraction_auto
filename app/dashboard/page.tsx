"use client";
import React, { useState, useEffect, Fragment } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Make sure to import your firestore instance
import { Dialog, Transition } from "@headlessui/react";
import DefaultLayout from "@/components/DeafultLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <GridToolbarExport />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};

const Manage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "collector", "form");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.job) {
            const jobsWithFormattedDate = data.job.map((job: any) => ({
              ...job,
              date: new Date(job.date).toLocaleDateString(), // Convert timestamp to a readable date string
            }));
            setJobs(jobsWithFormattedDate);
          }
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", type: "string", flex: 1 },
    { field: "date", headerName: "Date", type: "string", flex: 1 },

    // { field: 'date', headerName: 'Date', type: 'string', flex: 1, valueFormatter: (params) => params.value?.seconds ? new Date(params.value.seconds * 1000).toLocaleDateString() : '' },
    {
      field: "measuredOutputPerDay",
      headerName: "Output Per Day",
      type: "string",
      flex: 1,
    },
    {
      field: "unitOfMeasurement",
      headerName: "Unit of Measurement",
      type: "string",
      flex: 1,
    },
    {
      field: "expectedOutput",
      headerName: "Expected Output",
      type: "string",
      flex: 1,
    },
    {
      field: "view",
      headerName: "View",
      renderCell: (params) => (
        <button
          onClick={() => handleView(params.id)}
          className="px-2 py-1 bg-blue-500 text-white text-sm rounded shadow hover:bg-blue-600 transition duration-300"
        >
          View
        </button>
      ),
      flex: 1,
    },
  ];
  const handleView = (job: any) => {
    const filteredResult = jobs.filter((jo) => jo.id === job);
    console.log("this is ", filteredResult);
    setSelectedJob(filteredResult);
    setIsOpen(true);
  };

  return (
    <DefaultLayout>


    <div className="flex justify-center items-center">
      <div className="p-4 mt-3 shadow2 bg-white rounded-md w-full max-w-5xl">
        <h1 className="text-xl text-black font-bold mb-4">Manage Jobs</h1>
        <div className="h-80 w-full">
          <DataGrid
            rows={jobs}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 25, 50]}
            className="bg-white"
          />
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Job Details
                  </Dialog.Title>
                  {selectedJob && (
                    <div className="mt-4 text-black">
                      <p>
                        <strong>Job Description:</strong>{" "}
                        {selectedJob[0]?.jobDescription}
                      </p>
                      <p>
                        <strong>Name:</strong> {selectedJob[0]?.name}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {selectedJob[0]?.date}
                      </p>

                      <p>
                        <strong>Profession:</strong>{" "}
                        {selectedJob[0]?.profession}
                      </p>
                      <p>
                        <strong>Number of Assistants:</strong>{" "}
                        {selectedJob[0]?.numberOfAssistants}
                      </p>
                      <p>
                        <strong>Measured Output Per Day:</strong>{" "}
                        {selectedJob[0]?.measuredOutputPerDay}
                      </p>
                      <p>
                        <strong>Unit of Measurement:</strong>{" "}
                        {selectedJob[0]?.unitOfMeasurement}
                      </p>
                      <p>
                        <strong>Expected Output:</strong>{" "}
                        {selectedJob[0]?.expectedOutput}
                      </p>
                      <p>
                        <strong>Daily Payment Professional:</strong>{" "}
                        {selectedJob[0]?.dailyPaymentProfessional}
                      </p>
                      <p>
                        <strong>Daily Payment Assistant:</strong>{" "}
                        {selectedJob[0]?.dailyPaymentAssistant}
                      </p>
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Close 
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
    </div>
   
    </DefaultLayout>
  );
};

export default Manage;

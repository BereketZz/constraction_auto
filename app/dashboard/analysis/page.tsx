// pages/dashboard/index.tsx
"use client";
import React, { useState, useEffect } from 'react';
import DefaultLayout from '@/components/DeafultLayout';
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { toast } from 'react-toastify';

const Analysis: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [totalOutput, setTotalOutput] = useState<number>(0);
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalPaymentAssistant, setTotalPaymentAssistant] = useState<number>(0);
  const [totalPaymentProfessional, setTotalPaymentProfessional] = useState<number>(0);

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
              date: new Date(job.date).toLocaleDateString('en-US'), // Convert timestamp to a readable date string
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

  useEffect(() => {
    if (!selectedDate) return;

    const selectedDateFormatted = new Date(selectedDate).toLocaleDateString('en-US');
    const filteredJobs = jobs.filter((job) => job.date === selectedDateFormatted);

    let outputSum = 0;
    let paymentAssistantSum = 0;
    let paymentProfessionalSum = 0;

    filteredJobs.forEach((job) => {
      outputSum += Number(job.measuredOutputPerDay) || 0;
      paymentAssistantSum += Number(job.dailyPaymentAssistant) || 0;
      paymentProfessionalSum += Number(job.dailyPaymentProfessional) || 0;
    });

    setTotalOutput(outputSum);
    setTotalPaymentAssistant(paymentAssistantSum);
    setTotalPaymentProfessional(paymentProfessionalSum);
  }, [selectedDate, jobs]);

  return (
    <DefaultLayout>
      <div className="p-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded text-black"
          placeholder="Select a date"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800">{totalOutput}</h2>
          <p className="mt-2 text-gray-600">Total Measured Output Per Day</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800">{totalPaymentAssistant} ETB</h2>
          <p className="mt-2 text-gray-600">Total Daily Payment of Assistant</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800">{totalPaymentProfessional} ETB</h2>
          <p className="mt-2 text-gray-600">Total Daily Payment for Professional</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Analysis;

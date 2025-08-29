"use client";

import { Button } from "../ui/button";
import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { cy } from "date-fns/locale";


export const CalenderView = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const dayName = currentDate.toLocaleString("default", { weekday: "long" });
  const [currentPrescription, setCurrentPrescription] = React.useState<
    | {
        id: number;
        drugName: string;
        dosage: string;
        frequency: string;
        endDate: Date;
        currentDate: Date;
      }
    | undefined
  >(undefined);

  const [prescriptions, setPrescriptions] = React.useState([
    {
      id: 1,
      drugName: "Drug A",
      dosage: "10mg",
      frequency: "Once a day",
      endDate: new Date(2025, 10, 2),
      currentDate: currentDate,
    },
    {
      id: 2,
      drugName: "Drug B",
      dosage: "20mg",
      frequency: "Twice a day",
      endDate: new Date(2025, 9, 2),
      currentDate: currentDate,
    },
    {
      id: 3,
      drugName: "Drug C",
      dosage: "5mg",
      frequency: "As needed",
      endDate: new Date(2025, 9, 10),
      currentDate: currentDate,
    },
  ]);

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: currentPrescription?.currentDate ?? currentDate,
    to: currentPrescription?.endDate ?? undefined,
  });

  return (
    <div className="w-full min-h-screen flex flex-col">
      <h2 className="text-xl font-bold">Prescriptions</h2>
      <h3 className="text-sm text-muted-foreground">
        Manage your prescriptions
      </h3>
      <p className="text-muted-foreground text-sm">{`${dayName}, ${day}/${month + 1}/${year}`}</p>
      <div className="mt-2 flex-1 py-4">
        <div className="w-full h-full border-2 border-dashed border-muted rounded-lg">
          {prescriptions.length === 0 ? (
            <p className="text-center m-auto">No prescriptions found</p>
          ) : (
            <div className="p-4 list-disc list-inside space-y-2">
              {prescriptions.map((prescription) => (
                <li
                  role="button"
                  key={prescription.id}
                  onClick={() => {
                    setCurrentPrescription(prescription);
                    setDateRange({
                      from: currentDate,
                      to: prescription.endDate,
                    });
                  }}
                  className={cn("cursor-pointer hover:bg-accent p-2 rounded", {
                    "bg-green-300":
                      currentPrescription?.id === prescription.id,
                  })}
                >
                  {prescription.drugName} - {prescription.dosage} (
                  {prescription.frequency}){" "}
                  <span className="text-muted-foreground text-sm">
                    until {prescription.endDate.toDateString()}
                  </span>
                </li>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 w-full flex justify-center">
          <Button
            onClick={() => {
              if (currentPrescription) {
                const updatedDate = new Date(currentPrescription.currentDate.getTime() + 24 * 60 * 60 * 1000);
                const updatedPrescription = {
                  ...currentPrescription,
                  currentDate: updatedDate,
                };

                setCurrentPrescription(updatedPrescription);
                setDateRange({ from: updatedDate, to: updatedPrescription.endDate });

                setPrescriptions((prev) =>
                  prev.map((p) =>
                    p.id === currentPrescription.id ? updatedPrescription : p
                  )
                );
              }
            }}
            disabled={!currentPrescription}
            variant={"outline"}
            className="bg-green-600 text-white"
          >
            Clear Prescriptions for Today
          </Button>
        </div>
        <div className="mt-4 w-full flex justify-center">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            className="rounded-lg border shadow-sm"
            numberOfMonths={2}
          />
        </div>
      </div>
    </div>
  );
};

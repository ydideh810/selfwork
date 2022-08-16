import { Priority } from "@prisma/client";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";

export const useProjectForm = (userId: string) => {
  const [name, setName] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isClientTouched, setIsClientTouched] = useState(false);
  const [isClientError, setIsClientError] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("NONE");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFirstFormValid, setFirstFormValid] = useState(false);
  const clients = useAppSelector((state) => state.userSlice.user.clients);

  return {
    name,
    isNameTouched,
    setIsNameTouched,
    clients,
    isClientTouched,
    setIsClientTouched,
    setName,
    hourlyRate,
    setHourlyRate,
    selectedClient,
    setSelectedClient,
    isNameError,
    setIsNameError,
    isClientError,
    setIsClientError,
    priority,
    setPriority,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    description,
    setDescription,
    isFirstFormValid,
    isFormValid,
    setIsFormValid,
    setFirstFormValid,
  };
};
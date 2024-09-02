'use client'
import ModalBudget from "@/components/ModalBudget";
import { useState } from "react";

export default function page() {
    const [openModal, setOpenModal] = useState(false)
  return (
    <div className="h-full p-5">
      <div className="flex justify-between">
        <h2 className="text-xl">Budgets</h2>
        <button className="text-xs h-fit w-fit px-2 py-2 bg-grey_500 text-white" onClick={() => setOpenModal(true)}>
          Add New Budget
        </button>
      </div>
      {
        openModal ?
        <ModalBudget
            closeBtn={() => setOpenModal(false)}
        />
        :
        <></>
      }
    </div>
  );
}

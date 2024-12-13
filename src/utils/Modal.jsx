// import React from "react";

const Modal = ({ content, title }) => {
 
  return (
   <>
   {
     <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[9999] items-center px-4">
     <dialog
       open
       className=" w-[90%] lg:w-[670px] max-h-[480px] p-5 rounded-2xl flex flex-col justify-center bg-white overflow-y-auto text-black  md:w-[450px]"
     >
       <div className="flex justify-between pt-10 pb-5 items-center">
         <h3 className="font-bold text-[22px] text-[#364A63]">{title}</h3>
         
       </div>
       <hr />
       <div className="mt-3">{content}</div>
     </dialog>
   </div>
   
   }
    
    </>
  );
};

export default Modal;
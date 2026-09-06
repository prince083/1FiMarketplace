
export const ViewportContainer = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F0EEF8] flex items-center justify-center selection:bg-[#6C38FF] selection:text-white">
      <div className="h-full max-h-[100dvh] w-full sm:w-auto sm:aspect-[9/18.5] sm:max-w-[395px] sm:min-w-[320px] bg-[#FDFDFF] shadow-[0_0_50px_rgba(30,10,60,0.12)] sm:border-x sm:border-gray-200/60 flex flex-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default ViewportContainer;

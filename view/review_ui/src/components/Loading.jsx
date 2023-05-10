function Load() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200/50">
      <div
        className="h-14 w-14 animate-spin rounded-full border-4 border-purple-500 border-l-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
export default Load;

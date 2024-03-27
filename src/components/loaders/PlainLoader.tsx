const PlainLoader: React.FC<{
  message: string;
  customPosition?: string;
  loading: boolean;
}> = ({ message, customPosition = "top-7 right-7", loading }) => {
  return (
    <div
      className={`fixed z-50 ${loading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} ${customPosition} transition-opacity duration-500 ease-in-out`}
    >
      <div className="flex items-center rounded-full bg-white px-4 py-2 shadow-md">
        <div className="mr-2 h-9 w-9 animate-spin rounded-full border border-t-2 border-gray-800" />
        <div className="animate-pulse text-gray-800">{message}</div>
      </div>
    </div>
  );
};

export default PlainLoader;

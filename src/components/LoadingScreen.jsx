const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-t-2 border-white border-opacity-70 border rounded-full animate-spin"></div>
        <div className="text-white text-2xl font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

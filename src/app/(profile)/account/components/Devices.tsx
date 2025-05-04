const Devices = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Active Devices</h2>

      <div className="bg-zinc-800 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Currently Active</h3>
          <span className="text-green-500 text-sm font-medium">3 devices</span>
        </div>

        <div className="space-y-4">
          {/* Windows PC */}
          <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Windows PC</p>
                <p className="text-gray-400 text-sm">Last active: Today</p>
              </div>
            </div>
            <button className="bg-red-500 text-gray-100 font-medium px-4 py-1 text-sm rounded border border-red-700 tracking-widest hover:bg-red-700 transition-colors duration-200">
              Log out
            </button>
          </div>

          {/* iPhone */}
          <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">iPhone 14</p>
                <p className="text-gray-400 text-sm">Last active: Yesterday</p>
              </div>
            </div>
            <button className="bg-red-500 text-gray-100 font-medium px-4 py-1 text-sm rounded border border-red-700 tracking-widest hover:bg-red-700 transition-colors duration-200">
              Log out
            </button>
          </div>

          {/* Samsung TV */}
          <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Samsung TV</p>
                <p className="text-gray-400 text-sm">Last active: 3 days ago</p>
              </div>
            </div>
            <button className="bg-red-500 text-gray-100 font-medium px-4 py-1 text-sm rounded border border-red-700 tracking-widest hover:bg-red-700 transition-colors duration-200">
              Log out
            </button>
          </div>
        </div>
      </div>

      <button className="bg-red-800 text-gray-100 font-medium px-4 py-1 text-sm rounded border border-red-700 tracking-widest hover:bg-red-700 transition-colors duration-200">
        Log out of all devices
      </button>
    </div>
  );
};

export default Devices;

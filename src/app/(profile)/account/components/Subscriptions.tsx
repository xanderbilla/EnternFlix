const Subscriptions = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Subscription Details</h2>

      <div className="bg-zinc-800 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-medium mb-1">Premium Plan</h3>
            <p className="text-gray-400 text-sm">Monthly subscription</p>
          </div>
          <button className="bg-zinc-200 text-black font-medium px-4 py-2 text-sm rounded border border-zinc-600 tracking-widest hover:bg-zinc-600 transition-colors duration-200">
            Active
          </button>
        </div>

        <div className="border-t border-zinc-700 pt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Next Billing Date</p>
              <p className="font-medium">July 15, 2024</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Payment Method</p>
              <p className="font-medium">•••• •••• •••• 4242</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">Plan Features</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Ultra HD (4K) streaming</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Watch on 4 devices at once</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Download on 6 devices</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>No ads</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="bg-zinc-700 text-white font-medium px-4 py-1 text-sm rounded border border-zinc-600 tracking-widest hover:bg-zinc-600 transition-colors duration-200">
          Manage Subscription
        </button>
        <button className="bg-zinc-700 text-white font-medium px-4 py-1 text-sm rounded border border-zinc-600 tracking-widest hover:bg-zinc-600 transition-colors duration-200">
          Update Payment Method
        </button>
      </div>
    </div>
  );
};

export default Subscriptions;

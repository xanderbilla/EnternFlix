import Button from "@/components/Button/Button";
import Card from "@/components/UI/Card";

const Subscriptions = () => {
  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6">Subscription Details</h2>

      <Card title="Premium Plan" subtitle="Monthly subscription">
        <div className="mb-4">
          <Button variant="primary">Active</Button>
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
      </Card>

      <div className="flex gap-4">
        <Button variant="secondary">Manage Subscription</Button>
        <Button variant="secondary">Update Payment Method</Button>
      </div>
    </div>
  );
};

export default Subscriptions;

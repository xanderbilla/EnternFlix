import EditableField from "./EditableField";
import { AccountFormProps } from "@/types/account";

const AccountForm = ({
  name,
  email,
  language,
  isKid,
  setLanguage,
  setIsKid,
}: AccountFormProps) => {
  return (
    <div className="text-neutral-300 gap-4">
      <h2 className="text-md px-4 font-medium py-2 mb-6 w-full h-10 bg-gray-600">
        {name}
      </h2>
      <div className="flex flex-col gap-8 text-md mt-2 px-4">
        <EditableField
          label="Email"
          currentValue={email}
          fieldType="email"
          placeholder="Enter new email"
        />

        <EditableField
          label="Password"
          currentValue=""
          fieldType="password"
          placeholder="Enter new password"
        />

        <div className="flex items-center gap-4">
          <span className="text-zinc-400 w-28 inline-block">Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-white w-40 py-2 px-4 bg-transparent border border-solid border-zinc-600 focus:outline-none"
            title="Language"
          >
            <option value="English" className="text-black">
              English
            </option>
            <option value="Other" className="text-black">
              Other
            </option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            title="Kid"
            type="checkbox"
            checked={isKid}
            onChange={() => setIsKid(!isKid)}
            className="h-4 w-4 border accent-red-500"
          />
          <span>Kid?</span>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;

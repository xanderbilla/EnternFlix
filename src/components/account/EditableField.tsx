import { useState } from "react";

interface EditableFieldProps {
  label: string;
  currentValue: string;
  fieldType: "email" | "password";
  placeholder: string;
}

export default function EditableField({
  label,
  currentValue,
  fieldType,
  placeholder,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    setTempValue("");
  };

  const handleCancel = () => {
    setTempValue(fieldType === "email" ? currentValue : "");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempValue(fieldType === "email" ? currentValue : "");
    setIsEditing(true);
  };

  const displayValue = fieldType === "password" ? "********" : currentValue;

  return (
    <div className="flex flex-col gap-4">
      {!isEditing && (
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 w-28 inline-block">{label}:</span>
          <span className="text-white">{displayValue}</span>
          <button
            onClick={handleEdit}
            className="text-sm text-gray-400 border border-gray-400 border-opacity-25 tracking-widest px-4 py-1 rounded hover:border-white hover:text-white transition-colors duration-200"
          >
            Change
          </button>
        </div>
      )}
      {isEditing && (
        <div className="transition-all duration-300 ease-in-out">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">{label}</label>
            <input
              type={fieldType}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-zinc-500"
              placeholder={placeholder}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              className="text-gray-400 border-2 font-light text-base border-opacity-25 border-gray-400 tracking-widest px-6 py-2 rounded hover:border-white hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-white text-black font-medium px-6 py-2 rounded border-2 border-opacity-25 border-gray-400 tracking-widest hover:bg-neutral-200 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

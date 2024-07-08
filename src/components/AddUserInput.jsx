const AddUserInput = ({ label, inputId, onChange, value, type }) => {
  return (
    <div>
      <label className="text-gray-700" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={label}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};

export default AddUserInput;

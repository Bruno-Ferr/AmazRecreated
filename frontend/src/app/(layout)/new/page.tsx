'use client'

import SearchableSelect from "@/components/SearchableSelect";

const options = ['Option 1', "gigabyte", 'gigahertz', 'gigante', 'Option 2', 'Option 3', 'Option 4'];

export default function TestPage() {
  const handleSelect = (selectedOption: any) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <div>
      <h1>Your Page</h1>
      <SearchableSelect options={options} onSelect={handleSelect} />
    </div>
  );
}
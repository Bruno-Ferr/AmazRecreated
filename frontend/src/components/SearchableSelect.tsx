'use client'
import { useIntersectionObserver } from "@/context/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

export default function SearchableSelect({ options, onSelect }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadedOptions, setLoadedOptions] = useState<string[]>([]);
  const [hasMoreOptions, setHasMoreOptions] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoadedOptions(options.slice(0, 10));
      setHasMoreOptions(options.length > 10);
    }
  }, [isOpen, options]);

  useEffect(() => {
    const handleScroll = () => {
      if (dropdownRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20 && hasMoreOptions) {
          const nextOptions = options.slice(0, loadedOptions.length + 10);
          setLoadedOptions(nextOptions);
          setHasMoreOptions(nextOptions.length < options.length);
        }
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [loadedOptions, options, hasMoreOptions]);

  const handleSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = loadedOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        ref={inputRef}
      />
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </div>
          ))}
          {hasMoreOptions && (
            <div className="px-3 py-2 text-gray-500 text-center">Loading more options...</div>
          )}
        </div>
      )}
    </div>
  );
}
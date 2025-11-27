import { SearchIcon } from 'lucide-react';

export default function SearchField() {
  return (
    <div className="focus-within:outline-2 flex px-4 py-2 w-fit rounded-full items-center  outline-brand/80 focus-within:gap-4">
      <label htmlFor="search">
        <SearchIcon size={18} />
      </label>
      <input
        id="search"
        className="w-0 opacity-0 focus-visible:outline-0 grow focus:w-[280px] focus:opacity-100 transition-all duration-500"
      />
    </div>
  );
}

'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useState } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  placeholder?: string;
}

export default function SearchField({ placeholder = '' }: Props) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _keyword = keyword.trim();
    if (!_keyword || _keyword.length < 2) {
      alert('검색어를 2글자 이상 입력해주세요.');
      return;
    }
    router.push(`/books/search?keyword=${_keyword}`);
  };

  //https://image.aladin.co.kr/product/31424/4/spineflip/k482832219_d.jpg

  return (
    <form
      className={cn([
        'group/search flex items-center gap-4',
        'bg-background-primary w-4/5 px-4 py-2',
        'border-border-secondary rounded-full border',
        'outline-border-brand-tertiary',
        'hover:bg-background-primary-hover',
        'focus-within:border-border-brand-tertiary focus-within:outline',
        'transition-all',
      ])}
      onSubmit={handleSubmit}
    >
      <label htmlFor="search">
        <SearchIcon
          className="stroke-icon-primary group-focus-within/search:stroke-icon-brand-secondary"
          size={18}
        />
      </label>
      <input
        id="search"
        className={cn([
          'w-full',
          'text-text-neutral-tertiary',
          'hover:placeholder:text-text-tertiary',
          'focus-visible:outline-0 focus-visible:placeholder:opacity-0',
        ])}
        value={keyword}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </form>
  );
}

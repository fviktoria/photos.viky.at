import { FC } from "react";

interface Props {
  tags: string[];
  activeTag: string;
  onFilter: (tag: string) => void;
}

const base =
  "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 cursor-pointer";
const active = "bg-neutral-900 text-white border-neutral-900";
const inactive =
  "border-neutral-300 text-neutral-700 hover:bg-neutral-900 hover:text-white";

export const TagFilter: FC<Props> = ({ tags, activeTag, onFilter }) => {
  return (
    <div
      className="flex flex-wrap gap-2 mb-8"
      role="group"
      aria-label="Filter photos by tag"
    >
      <button
        className={`${base} ${activeTag === "all" ? active : inactive}`}
        onClick={() => onFilter("all")}
        aria-pressed={activeTag === "all"}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`${base} ${activeTag === tag ? active : inactive}`}
          onClick={() => onFilter(tag)}
          aria-pressed={activeTag === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

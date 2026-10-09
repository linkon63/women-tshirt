import React from "react";

export default function OptionSelect({
  optionName,
  values,
  selectProductOptions,
  product,
  colors,
  productIndex,
  selectOption,
}: any) {
  const getColorDot = (colorName: string) => {
    const c = (colorName || "").toLowerCase();
    if (c.includes("black")) return "bg-neutral-900 border-neutral-700";
    if (c.includes("red")) return "bg-red-600 border-red-700";
    if (c.includes("white")) return "bg-white border-neutral-300";
    return "bg-neutral-400 border-neutral-500";
  };

  const getOptionLabel = (name: string) => {
    if (name.toLowerCase() === "size") return "সাইজ (Size)";
    if (name.toLowerCase() === "color" || name.toLowerCase() === "colour")
      return "কালার (Color)";
    return name;
  };

  return (
    <div className="mt-2.5">
      <div key={optionName} className="flex flex-wrap gap-2 items-center">
        <span className="font-display font-medium text-xs sm:text-sm text-neutral-600 shrink-0">
          {getOptionLabel(optionName)}:
        </span>
        <div className="flex flex-wrap gap-1.5 items-center">
          {/* Size choices */}
          {optionName === "Size" &&
            (values as string[]).map((value, index) => {
              const isSelected = selectOption?.Size === value;
              return (
                <button
                  key={value + index}
                  type="button"
                  className={`
                    rounded-lg border px-3 py-1 text-xs sm:text-sm font-display font-medium transition-all cursor-pointer min-w-[36px] text-center
                    ${
                      isSelected
                        ? "border-yellow-500 text-neutral-950 bg-yellow-100 shadow-2xs ring-1 ring-yellow-400 font-semibold"
                        : "border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                    }
                  `}
                  onClick={(e) =>
                    selectProductOptions(e, optionName, value, product)
                  }
                >
                  {value}
                </button>
              );
            })}

          {/* Color choices indicator */}
          {optionName === "Color" && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-yellow-500 font-display font-medium text-neutral-900 bg-yellow-50 px-2.5 py-1 text-xs sm:text-sm shadow-2xs">
              <span
                className={`w-3 h-3 rounded-full border shadow-2xs ${getColorDot(
                  selectOption?.Color || colors?.[productIndex] || ""
                )}`}
              />
              <span>{selectOption?.Color || colors?.[productIndex] || ""}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

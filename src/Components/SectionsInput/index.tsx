import React, { useState, useEffect, useCallback } from "react";
import { Input } from "antd";
import type { InputProps } from "antd";

interface SectionsInputProps {
  sections: Array<{
    length: number;
    inputProps?: InputProps & { placeholder?: string };
  }>;
  value?: string;
  onChange?: (value: string) => void;
}

export const sectionsInputValidator =
  (sections: Array<{ length: number }>, name: string) =>
  ({ getFieldValue }: any) => ({
    validator(_: any, __: any) {
      const value = getFieldValue(name);
      const parts = value?.split(/-/) || [];
      const isValid = sections.every((section, i) =>
        new RegExp(`^\\d{${section.length}}$`).test(parts[i])
      );
      return isValid
        ? Promise.resolve()
        : Promise.reject(new Error("Please input in full format"));
    },
  });

const SectionsInput: React.FC<SectionsInputProps> = ({
  sections,
  onChange,
  value = "",
}) => {
  const totalLength = sections.reduce((sum, s) => sum + s.length, 0);
  const [parts, setParts] = useState<string[]>([]);

  useEffect(() => {
    const newParts = value.split(/-/);
    setParts(sections.map((_, i) => newParts[i] || ""));
  }, [value, sections]);

  const updateValue = useCallback(
    (newParts: string[]) => {
      const sectionsFilters = sections.filter((_, i) => newParts[i]);
      if (sectionsFilters.length === 0) {
        onChange?.("");
      } else {
        const formatted = sections.map((_, i) => newParts[i]).join("-");
        onChange?.(formatted);
      }
    },
    [onChange, sections]
  );

  const handlePartChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "");
      const clippedValue = rawValue.slice(0, sections[index].length);
      const newParts = [...parts];
      newParts[index] = clippedValue;
      setParts(newParts);
      updateValue(newParts);
    };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
      }}
    >
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <Input
            {...section.inputProps}
            value={parts[index]}
            onChange={handlePartChange(index)}
            maxLength={section.length}
            style={{
              flex: section.length / totalLength,
              minWidth: 0,
              ...section.inputProps?.style,
            }}
          />
          {index < sections.length - 1 && (
            <span style={{ flexShrink: 0, fontFamily: "Elza-Semibold" }}>
              —
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SectionsInput;

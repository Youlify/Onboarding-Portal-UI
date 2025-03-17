import React, { useState } from "react";
import "./index.less";

export interface RadioProps extends RadioGroupOptionsProps {
  isSelected?: boolean;
  style?: React.CSSProperties;
  onChange?: (value: RadioGroupOptionsProps["value"]) => void;
}

export interface RadioGroupOptionsProps {
  value: string | number | boolean;
  label: string;
}

export interface RadioGroupProps {
  value?: RadioGroupOptionsProps["value"];
  options: RadioGroupOptionsProps[];
  onChange?: (value: RadioGroupOptionsProps["value"]) => void;
}

export const Radio: React.FC<RadioProps> = (props) => {
  const { value, label, isSelected = false, style, onChange } = props;
  let className = "p-radio";
  if (isSelected) className += " p-radio--selected";
  return (
    <div className={className} style={style} onClick={() => onChange?.(value)}>
      {label}
    </div>
  );
};

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { value, options, onChange } = props;
  const [innerValue, setInnerValue] = useState(value || options?.[0].value);

  const onValueChange = (value: RadioGroupOptionsProps["value"]) => {
    setInnerValue(value);
    onChange?.(value);
  };

  return (
    <div className="p-radio-group">
      {options.map((option, index) => {
        const isNextIndex = index > 0;
        const style = (
          isNextIndex ? { marginLeft: 12 } : {}
        ) as React.CSSProperties;
        return (
          <Radio
            key={index}
            value={option.value}
            label={option.label}
            isSelected={option.value === innerValue}
            onChange={onValueChange}
            style={style}
          />
        );
      })}
    </div>
  );
};

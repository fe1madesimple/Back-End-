"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import styles from "./CustomSelect.module.css";

interface Option {
  value: string;
  label: string;
  meta?: string; // optional subtitle line (e.g. module number)
  color?: string; // optional color dot
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  label,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      {label && <div className={styles.label}>{label}</div>}
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""} ${disabled ? styles.triggerDisabled : ""}`}
        onClick={() => !disabled && setOpen((p) => !p)}
        disabled={disabled}
      >
        <div className={styles.triggerContent}>
          {selected?.color && (
            <div
              className={styles.colorDot}
              style={{ background: selected.color }}
            />
          )}
          <span
            className={
              selected ? styles.triggerValue : styles.triggerPlaceholder
            }
          >
            {selected ? selected.label : placeholder}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.length === 0 && (
            <div className={styles.empty}>No options available</div>
          )}
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.option} ${option.value === value ? styles.optionSelected : ""}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <div className={styles.optionLeft}>
                {option.color && (
                  <div
                    className={styles.colorDot}
                    style={{ background: option.color }}
                  />
                )}
                <div className={styles.optionText}>
                  <span className={styles.optionLabel}>{option.label}</span>
                  {option.meta && (
                    <span className={styles.optionMeta}>{option.meta}</span>
                  )}
                </div>
              </div>
              {option.value === value && (
                <Check size={13} color="var(--blue-bright)" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

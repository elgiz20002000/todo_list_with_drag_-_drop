export interface ValidatedData {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate({
  value,
  required,
  minLength,
  maxLength,
  min,
  max,
}: ValidatedData) {
  let IsValid = true;
  if (required) {
    IsValid = value.toString().trim().length > 0;
  }
  if (minLength != null && typeof value == "string") {
    IsValid = IsValid && value.toString().trim().length > minLength;
  }
  if (maxLength != null && typeof value == "string") {
    IsValid = IsValid && value.toString().trim().length > maxLength;
  }
  if (min != null && typeof value == "number") {
    IsValid = IsValid && value > min;
  }
  if (max != null && typeof value == "number") {
    IsValid = IsValid && value < max;
  }
  return IsValid;
}

import { cn } from "@/lib/utils";
import {
  NumericFormat,
  NumericFormatProps,
  PatternFormat,
} from "react-number-format";

interface InputPersonalizadoProps extends NumericFormatProps {
  className?: string;
  moeda?: boolean;
}
export default function InputPersonalizado({
  className,
  moeda,
  ...props
}: InputPersonalizadoProps) {
  if (moeda) {
    return (
      <NumericFormat
        {...props}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        allowLeadingZeros={false}
        decimalScale={2}
        decimalSeparator=","
        thousandSeparator="."
        fixedDecimalScale
        prefix="R$ "
      />
    );
  }
  return (
    <PatternFormat {...props} format="(##) #####-####" mask="_" type="tel" />
  );
}

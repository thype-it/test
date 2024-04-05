import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export enum ButtonVariant {
  primary,
  secondary,
}

type Props = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children?: ReactNode;
  onPress?: () => void;
  className?: string;
};

export default function Button({
  variant = ButtonVariant.primary,
  fullWidth,
  children,
  onPress,
  className,
}: Props) {
  const buttonStyles = useButtonStyles;
  const textStyles = useTextStyles;

  const buttonVariantStyle = getButtonStyle(variant);
  const textVariantStyle = getTextStyle(variant);

  return (
    <button
      type="button"
      onClick={onPress}
      className={cn(
        `flex h-14 w-64 shrink-0 items-center justify-center gap-2 rounded-[6.8125rem] px-10 py-[1.125rem]
        shadow-[-3px_-4px_7px_0px_rgba(255,255,255,0.30)_inset]`,
        buttonVariantStyle,
        fullWidth && "w-full",
        className,
      )}
    >
      <p
        className={cn(
          "font-teleneo text-sm/[1rem] font-medium uppercase tracking-[0.00875rem]",
          textVariantStyle,
        )}
      >
        {children}
      </p>
    </button>
  );

  function getButtonStyle(variant: ButtonVariant) {
    switch (variant) {
      case ButtonVariant.primary: {
        return buttonStyles.primaryButton;
      }
      case ButtonVariant.secondary: {
        return buttonStyles.secondaryButton;
      }
    }
  }

  function getTextStyle(variant: ButtonVariant) {
    switch (variant) {
      case ButtonVariant.primary: {
        return textStyles.primaryText;
      }
      case ButtonVariant.secondary: {
        return textStyles.secondaryText;
      }
    }
  }
}

const useButtonStyles = {
  primaryButton: "primary-gradient",
  secondaryButton: "secondary-gradient border-2 border-solid border-primary",
};

const useTextStyles = {
  primaryText: "text-white",
  secondaryText: "text-primary",
};

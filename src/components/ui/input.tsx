import { TextInput, TextInputProps, View, Platform } from "react-native";

import { colors } from "@/styles/colors";

import clsx from "clsx";

type Variants = "primary" | "secondary" | "tertiary";
type InputProps = {
  children: React.ReactNode;
  variant?: Variants;
};

type InputFieldProps = TextInputProps;

function Input(props: InputProps) {
  const { children, variant = "primary" } = props;

  return (
    <View
      className={clsx("w-full h-16 flex-row items-center gap-2", {
        "h-14 px-4 rounded-lg border border-zinc-800": variant !== "primary",
        "bg-zinc-950": variant === "secondary",
        "bg-zinc-900": variant === "tertiary",
      })}
    >
      {children}
    </View>
  );
}

function Field(props: InputFieldProps) {
  const { ...rest } = props;
  return (
    <TextInput
      className="flex-1 text-zinc-100 text-lg font-regular"
      placeholderTextColor={colors.zinc[400]}
      cursorColor={colors.zinc[100]}
      selectionColor={Platform.OS === "ios" ? colors.zinc[100] : undefined}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };

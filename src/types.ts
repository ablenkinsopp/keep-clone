export type Colour =
    | "neutral"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "info"
    | "muted";

export type Size =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"

export type AuthFormProps = {
    onToggle: () => void
}
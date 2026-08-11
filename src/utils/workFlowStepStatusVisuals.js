export const normalize = (v) =>
  String(v ?? "")
    .toLowerCase()
    .trim();

export function getStepStatus(checkpoints, stepId) {
  const status = normalize(checkpoints?.[stepId]?.status);
  if (status === "success") return "success";
  if (status === "pending" || status === "warning") return "pending";
  if (status === "failed" || status === "error") return "failed";
  return "unknown";
}

export function getColorsForStatus(status) {
  switch (status) {
    case "success":
      return {
        circleBorder: "border-green-600",
        circleBg: "bg-green-600",
        iconColor: "text-white",
        connector: "bg-green-600",
        label: "text-slate-700",
      };
    case "failed":
      return {
        circleBorder: "border-green-600",
        circleBg: `bg-red-500`,
        iconColor: "text-white",
        connector: "bg-amber-400",
        label: "text-slate-700",
      };
    case "pending":
      return {
        circleBorder: "border-2 border-primary-warning",
        circleBg: "bg-white",
        iconColor: "text-primary-warning",
        connector: "bg-[#F25757]",
        label: "text-slate-700",
      };
    default:
      return {
        circleBorder: "border-slate-300",
        circleBg: "bg-white",
        iconColor: "text-slate-400",
        connector: "bg-slate-300",
        label: "text-slate-600",
      };
  }
}

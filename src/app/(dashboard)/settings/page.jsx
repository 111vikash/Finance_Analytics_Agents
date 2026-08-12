import Card from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="title-lg">Settings</h1>
        <p className="subtitle mt-1">User preferences and account settings scaffold.</p>
      </div>

      <Card className="p-5">
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Profile settings, notifications, and security preferences will be added later.
        </div>
      </Card>
    </div>
  );
}
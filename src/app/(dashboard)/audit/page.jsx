import { Card } from "@/components/common/Card";
import { ROLE_MATRIX } from "@/utils/constants";

export default function UsersRolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Users & Roles</h1>
        <p className="section-subtitle">
          Role definitions, responsibilities, and access governance.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {ROLE_MATRIX.map((item) => (
          <Card key={item.role} className="p-5">
            <div className="text-sm font-semibold text-brand-700">{item.role}</div>
            <div className="mt-3">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Primary Responsibility
              </div>
              <div className="mt-1 text-sm text-slate-900">{item.responsibility}</div>
            </div>
            <div className="mt-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Key Activities
              </div>
              <div className="mt-1 text-sm leading-6 text-slate-600">{item.activities}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default function AccountSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Settings</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Manage your profile and account preferences.</p>

      <form className="mp-card p-7 mt-8 max-w-xl space-y-5">
        <Field label="Full Name" defaultValue="Maria Alvarez" />
        <Field label="Email" defaultValue="maria@brandco.com" type="email" />
        <Field label="Company" defaultValue="BrandCo Inc." />
        <Field label="Country" defaultValue="United States" />
        <button type="button" className="mp-btn-primary rounded-lg px-5 py-2.5 text-[13px] font-semibold">Save Changes</button>
      </form>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-mp-ink mb-1.5 block">{label}</span>
      <input type={type} defaultValue={defaultValue} className="mp-input" />
    </label>
  );
}

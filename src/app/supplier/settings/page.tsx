export default function SupplierSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Settings</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Manage account access and notification preferences.</p>

      <form className="mp-card p-7 mt-8 max-w-xl space-y-5">
        <Field label="Contact Name" defaultValue="Ji-woo Park" />
        <Field label="Account Email" defaultValue="contact@luminacosmetics.com" type="email" />
        <label className="flex items-center gap-3 text-[13.5px] text-mp-ink-2">
          <input type="checkbox" defaultChecked className="accent-blue-600 w-3.5 h-3.5" /> Email me when a new buyer lead matches my profile
        </label>
        <label className="flex items-center gap-3 text-[13.5px] text-mp-ink-2">
          <input type="checkbox" defaultChecked className="accent-blue-600 w-3.5 h-3.5" /> Email me when I receive a new message
        </label>
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

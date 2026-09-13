export default function SupplierProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Company Profile</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">This information is shown publicly on your Veridian supplier page.</p>

      <form className="mp-card p-7 mt-8 max-w-2xl space-y-5">
        <Field label="Company Name" defaultValue="Lumina Cosmetics Labs" />
        <Field label="Tagline" defaultValue="Clean-formula skincare & color cosmetics OEM" />
        <div className="grid grid-cols-2 gap-5">
          <Field label="Country" defaultValue="South Korea" />
          <Field label="Supplier Type" defaultValue="Manufacturer" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Field label="Minimum Order Quantity" defaultValue="500 units" />
          <Field label="Lead Time" defaultValue="15–25 days" />
        </div>
        <label className="block">
          <span className="text-[13px] font-medium text-mp-ink mb-1.5 block">Company Overview</span>
          <textarea rows={4} defaultValue="Lumina Cosmetics Labs formulates and manufactures skincare, color cosmetics and personal care lines for over 300 international brands." className="mp-input resize-none" />
        </label>
        <button type="button" className="mp-btn-primary rounded-lg px-5 py-2.5 text-[13px] font-semibold">Save Profile</button>
      </form>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-mp-ink mb-1.5 block">{label}</span>
      <input defaultValue={defaultValue} className="mp-input" />
    </label>
  );
}

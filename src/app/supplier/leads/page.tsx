import { LeadList } from "../lead-list";

export default function SupplierLeadsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Buyer Leads</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Buyer requests matching your product categories and capabilities.</p>
      <div className="mt-8">
        <LeadList />
      </div>
    </div>
  );
}

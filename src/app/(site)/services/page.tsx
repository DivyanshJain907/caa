import SectionHeading from "@/components/site/SectionHeading";
import ServiceModal from "@/components/site/ServiceModal";
import { defaultServices } from "@/lib/defaults";
import { getServices } from "@/lib/queries";

export const dynamic = "force-dynamic";

type ServiceItem = {
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
};

export default async function ServicesPage() {
  const services = (await getServices()) as unknown as ServiceItem[];
  const items: ServiceItem[] = services.length > 0 ? services : defaultServices;

  const grouped = items.reduce<Record<string, ServiceItem[]>>(
    (acc, service) => {
      acc[service.category] = acc[service.category] || [];
      acc[service.category].push(service);
      return acc;
    },
    {},
  );

  return (
    <div className="section-space">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <SectionHeading
          eyebrow="Services"
          title="Comprehensive financial services"
          description="Explore our full range of chartered accountant services, designed to strengthen compliance and empower decision-making."
        />

        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([category, services]) => (
            <div key={category} className="flex flex-col gap-6">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                {category}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {services.map((service) => (
                  <ServiceModal key={service.title} service={service}>
                    <div className="glass-panel flex flex-col gap-4 rounded-3xl p-6">
                      <div className="text-lg font-semibold text-navy-900">
                        {service.title}
                      </div>
                      <p className="text-sm text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  </ServiceModal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

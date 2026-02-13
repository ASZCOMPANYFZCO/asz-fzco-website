import { Globe, ShieldCheck, Award, Truck } from "lucide-react";
import { VALUE_PROPOSITIONS } from "@/lib/constants";

const iconMap = {
  globe: Globe,
  "shield-check": ShieldCheck,
  award: Award,
  truck: Truck,
};

export function ValueProposition() {
  return (
    <section className="section bg-[var(--color-bg-secondary)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Why Choose ASZ Company?
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            We combine decades of industry expertise with a commitment to quality
            and customer satisfaction.
          </p>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PROPOSITIONS.map((prop, index) => {
            const Icon = iconMap[prop.icon as keyof typeof iconMap];
            return (
              <div
                key={prop.title}
                className="group p-6 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)] transition-colors">
                  <Icon className="h-6 w-6 text-[var(--color-accent)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  {prop.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

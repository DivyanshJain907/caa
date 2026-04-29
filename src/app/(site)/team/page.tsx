import SectionHeading from "@/components/site/SectionHeading";
import ProfileModal from "@/components/site/ProfileModal";
import { defaultTeam } from "@/lib/defaults";
import { getTeam } from "@/lib/queries";

export const dynamic = "force-dynamic";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function TeamPage() {
  const team = (await getTeam()) as any[];
  const members = team.length > 0 ? team : defaultTeam;

  return (
    <div className="section-space">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <SectionHeading
          eyebrow="Our Team"
          title="Professionals anchored in precision"
          description="Experienced chartered accountants, auditors, and advisors dedicated to delivering premium financial outcomes."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <ProfileModal
              key={member.name}
              profile={{
                name: member.name,
                role: member.role,
                specialization: member.specialization,
                about: member.about,
                imageUrl: member.imageUrl,
              }}
            >
              <div className="glass-panel flex flex-col gap-4 rounded-3xl p-6">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-40 w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-navy-900 text-2xl font-semibold text-ivory">
                    {initials(member.name)}
                  </div>
                )}
                <div>
                  <div className="text-base font-semibold text-navy-900">
                    {member.name}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gold">
                    {member.role}
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  {member.specialization}
                </p>
              </div>
            </ProfileModal>
          ))}
        </div>
      </div>
    </div>
  );
}

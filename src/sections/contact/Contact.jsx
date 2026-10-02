import Icon from "../../components/icons/Icon.jsx";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import ContactRow from "./ContactRow.jsx";
import CopyableRow from "./CopyableRow.jsx";
import { useTr } from "../../hooks/useTr.js";
import { PROFILE, SOCIALS } from "../../data/profile.js";
import { UI } from "../../data/ui.js";
import { CARD, SECTION } from "../../utils/styles.js";

const phoneHref = (phone) => `tel:${phone.replace(/[^0-9+]/g, "")}`;

export default function Contact() {
  const tr = useTr();

  return (
    <section id="contact" className={SECTION}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={tr(UI.contact.title)} description={tr(UI.contact.description)} center />

        <div className="mt-12 space-y-4">
          <CopyableRow icon="mail" accent="text-cyan-400" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
          <CopyableRow icon="phone" accent="text-emerald-400" value={PROFILE.phone} href={phoneHref(PROFILE.phone)} />
          <ContactRow icon="pin" accent="text-violet-400">
            <span className="text-sm text-slate-300">{tr(PROFILE.location)}</span>
          </ContactRow>
        </div>

        <div className="mt-10 text-center">
          <div className="text-sm text-slate-500">{tr(UI.contact.findMe)}</div>
          <div className="mt-3 flex justify-center gap-3">
            {SOCIALS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`${CARD} p-3 text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100`}
              >
                <Icon name={icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

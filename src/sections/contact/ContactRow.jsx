import Icon from "../../components/icons/Icon.jsx";
import { ICON_BOX } from "../../utils/styles.js";

export default function ContactRow({ icon, accent, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#232a3b] bg-[#161b26]/60 p-4 backdrop-blur transition-colors hover:border-slate-600">
      <span className={`${ICON_BOX} ${accent}`}>
        <Icon name={icon} size={16} />
      </span>
      {children}
    </div>
  );
}

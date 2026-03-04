import type { SVGProps } from "react";
import type {
  ExtensionPropertyType,
  ExtensionRoofType,
  ExtensionType,
  FinishLevel,
  LoftType,
  ProjectType,
  RenovationScope,
  UkRegion,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

type CalculatorOptionIconKey =
  | ProjectType
  | ExtensionPropertyType
  | ExtensionType
  | ExtensionRoofType
  | LoftType
  | RenovationScope
  | UkRegion
  | FinishLevel;

type IconProps = SVGProps<SVGSVGElement>;
type IconComponent = (props: IconProps) => React.JSX.Element;

function IconRoot({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

function HouseIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </IconRoot>
  );
}

function DuplexIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M2.5 11 7 7.5 11.5 11" />
      <path d="M12.5 11 17 7.5 21.5 11" />
      <path d="M3.5 10.5V20h7v-4.5" />
      <path d="M13.5 10.5V20h7v-4.5" />
      <path d="M9 15.5h6" />
    </IconRoot>
  );
}

function TerraceIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M2 20h20" />
      <path d="M3 20V11h6v9" />
      <path d="M9 20V9h6v11" />
      <path d="M15 20v-8h6v8" />
      <path d="M2.5 11 6 8l3.5 3" />
      <path d="M8.5 9 12 6l3.5 3" />
      <path d="M14.5 12 18 9l3.5 3" />
    </IconRoot>
  );
}

function LShapedHouseIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M4 11 10 6l6 5v9H4z" />
      <path d="M16 20h4v-6h-4" />
      <path d="M12 20v-4h4" />
    </IconRoot>
  );
}

function RearExtensionIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M6 11 12 6l6 5v9H6z" />
      <path d="M4 13H1.5" />
      <path d="m3.8 10.8-2.3 2.2 2.3 2.2" />
    </IconRoot>
  );
}

function SideExtensionIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M6 11 12 6l6 5v9H6z" />
      <path d="M20 13h2.5" />
      <path d="m20.2 10.8 2.3 2.2-2.3 2.2" />
    </IconRoot>
  );
}

function WraparoundIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M8 11 12 7.5 16 11v9H8z" />
      <path d="M6 15H1.5" />
      <path d="m3.8 12.8-2.3 2.2 2.3 2.2" />
      <path d="M18 15h4.5" />
      <path d="m20.2 12.8 2.3 2.2-2.3 2.2" />
    </IconRoot>
  );
}

function FlatRoofIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M5 11h14" />
      <path d="M5 11v9h14v-9" />
      <path d="M7 8h10" />
    </IconRoot>
  );
}

function PitchedRoofIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="m4 12 8-6 8 6" />
      <path d="M6 11.5V20h12v-8.5" />
    </IconRoot>
  );
}

function GableRoofIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="m3 12 5-4 4 3 4-3 5 4" />
      <path d="M5 11.5V20h14v-8.5" />
    </IconRoot>
  );
}

function CrownRoofIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M6 12V9h3V7h6v2h3v3" />
      <path d="M6 12h12" />
      <path d="M6 12v8h12v-8" />
    </IconRoot>
  );
}

function VeluxIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M3.5 12 12 5l8.5 7" />
      <path d="M6 11.5V20h12v-8.5" />
      <rect x="10" y="11" width="4" height="3" />
    </IconRoot>
  );
}

function DormerIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M3.5 12 12 5l8.5 7" />
      <path d="M6 11.5V20h12v-8.5" />
      <path d="M9 16v-4l1.5-1.4h3L15 12v4" />
    </IconRoot>
  );
}

function HipToGableIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M3.5 12 12 5l8.5 7" />
      <path d="M6 11.5V20h12v-8.5" />
      <path d="M10 8h5" />
      <path d="m13.2 6 1.8 2-1.8 2" />
    </IconRoot>
  );
}

function MansardIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M4 12 7 8h10l3 4" />
      <path d="M5.5 12V20h13V12" />
      <path d="M9.5 8 8.5 12" />
      <path d="M14.5 8 15.5 12" />
    </IconRoot>
  );
}

function LondonRegionIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M4 20h16" />
      <path d="M6 20v-6h3v6" />
      <path d="M10.5 20V9h3v11" />
      <path d="M15 20v-4h3v4" />
      <path d="M12 6.5h0" />
    </IconRoot>
  );
}

function RestUkRegionIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="m3 6.5 5-2 8 2 5-2v13l-5 2-8-2-5 2z" />
      <path d="M8 4.5v13" />
      <path d="M16 6.5v13" />
    </IconRoot>
  );
}

function BasicFinishIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M12 5v3" />
      <path d="M12 16v3" />
      <path d="M9 12h3" />
      <path d="M13.5 12H15" />
    </IconRoot>
  );
}

function MidFinishIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M8 6v3" />
      <path d="M8 12v3" />
      <path d="M5 10.5h3" />
      <path d="M8 10.5h3" />
      <path d="M16 10v3" />
      <path d="M13 11.5h3" />
      <path d="M16 11.5h3" />
    </IconRoot>
  );
}

function HighFinishIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M6.5 7v3" />
      <path d="M6.5 13v3" />
      <path d="M3.5 11.5h3" />
      <path d="M6.5 11.5h3" />
      <path d="M12 5v3" />
      <path d="M12 12v3" />
      <path d="M9 10.5h3" />
      <path d="M12 10.5h3" />
      <path d="M17.5 9v3" />
      <path d="M14.5 10.5h3" />
      <path d="M17.5 10.5h3" />
    </IconRoot>
  );
}

function CosmeticIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="m4 18 5-5 2 2-5 5H4z" />
      <path d="m11 11 2-2 2 2-2 2z" />
    </IconRoot>
  );
}

function FullInternalIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M4 5h16v14H4z" />
      <path d="M12 5v14" />
      <path d="M4 12h8" />
    </IconRoot>
  );
}

function StructuralIcon(props: IconProps) {
  return (
    <IconRoot {...props}>
      <path d="M5 6h14" />
      <path d="M5 12h14" />
      <path d="M5 18h14" />
      <path d="M8 6v12" />
      <path d="M16 6v12" />
    </IconRoot>
  );
}

export const CALCULATOR_OPTION_ICONS: Record<CalculatorOptionIconKey, IconComponent> = {
  extension: WraparoundIcon,
  loftConversion: DormerIcon,
  fullHouseRenovation: StructuralIcon,
  detached: HouseIcon,
  semiDetached: DuplexIcon,
  endTerrace: TerraceIcon,
  terracedFlatBack: TerraceIcon,
  terracedLShaped: LShapedHouseIcon,
  rear: RearExtensionIcon,
  side: SideExtensionIcon,
  wraparound: WraparoundIcon,
  flat: FlatRoofIcon,
  pitched: PitchedRoofIcon,
  gable: GableRoofIcon,
  crown: CrownRoofIcon,
  velux: VeluxIcon,
  dormer: DormerIcon,
  hipToGable: HipToGableIcon,
  mansard: MansardIcon,
  londonSe: LondonRegionIcon,
  restUk: RestUkRegionIcon,
  basic: BasicFinishIcon,
  mid: MidFinishIcon,
  high: HighFinishIcon,
  cosmetic: CosmeticIcon,
  fullInternal: FullInternalIcon,
  structuralHighSpec: StructuralIcon,
};

export const getCalculatorOptionIcon = (option: CalculatorOptionIconKey) => {
  const Icon = CALCULATOR_OPTION_ICONS[option];
  return <Icon aria-hidden="true" focusable="false" />;
};

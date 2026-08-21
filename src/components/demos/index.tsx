import type { DemoId } from "@/lib/deck";
import { TwelveTabs } from "./TwelveTabs";
import { SubscriptionLedger } from "./SubscriptionLedger";
import { UrgencyClock } from "./UrgencyClock";
import { CancelWall } from "./CancelWall";
import { ComparisonSilent } from "./ComparisonSilent";
import { HomepageSkipped } from "./HomepageSkipped";
import { BrandIsNotAField } from "./BrandIsNotAField";

export function DemoStage({ id }: { id: DemoId }) {
  switch (id) {
    case "tabs":
      return <TwelveTabs />;
    case "ledger":
      return <SubscriptionLedger />;
    case "clock":
      return <UrgencyClock />;
    case "cancel":
      return <CancelWall />;
    case "compare":
      return <ComparisonSilent />;
    case "homepage":
      return <HomepageSkipped />;
    case "brand":
      return <BrandIsNotAField />;
  }
}

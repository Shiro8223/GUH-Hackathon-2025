export type DistanceBucket = "local" | "nearby" | "city-away";
export function computeBubblePoints({
isOppositeMajor,
distance,
rarityBoost = 0,
}: { isOppositeMajor: boolean; distance: DistanceBucket; rarityBoost?: number; }) {
const base = 10;
const major = isOppositeMajor ? 50 : 0; // big reward for cross-discipline
const distanceBonus = { local: 0, nearby: 20, "city-away": 40 }[distance];
const total = Math.min(100, base + major + distanceBonus + rarityBoost);
return total;
}
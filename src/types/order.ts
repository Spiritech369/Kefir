export const DELIVERY_METHODS = ["home-delivery", "pickup"] as const;

export type DeliveryMethod = (typeof DELIVERY_METHODS)[number];

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface PricedCartLine extends CartItem {
  productName: string;
  unitPriceMxn: number;
  lineTotalMxn: number;
}

export interface OrderTotals {
  subtotalMxn: number;
  deliveryMxn: number;
  totalMxn: number;
  amountUntilFreeDeliveryMxn: number;
  qualifiesForFreeDelivery: boolean;
}

export interface CheckoutDetails {
  name: string;
  phone: string;
  postalCode: string;
  neighborhood: string;
  address: string;
  references?: string;
  preferredDeliveryDay: string;
  preferredTime: string;
  deliveryMethod: DeliveryMethod;
  notes?: string;
  ingredientsAndAllergensAccepted: true;
  privacyAccepted: true;
}

export interface PreparedOrder {
  lines: readonly PricedCartLine[];
  totals: OrderTotals;
  customer: CheckoutDetails;
}

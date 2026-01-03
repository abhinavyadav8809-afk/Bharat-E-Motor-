
export interface ScooterModel {
  id: string;
  name: string;
  image: string;
  range: string;
  topSpeed: string;
  chargingTime: string;
  batteryType: string;
  price: string;
  description: string;
  features: string[];
}

export interface NavItem {
  label: string;
  path: string;
}

export interface TestRideForm {
  name: string;
  phone: string;
  model: string;
  date: string;
  notes?: string;
}

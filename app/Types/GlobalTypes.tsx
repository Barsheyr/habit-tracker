import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type AreaType = {
  _id: string;
  name: string;
  icon: IconProp;
};

type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

export type CompletedDays = {
  date: string;
  _id: string;
};

export type HabitType = {
  _id: string;
  name: string;
  icon: IconProp;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
  completedDays: CompletedDays[];
};

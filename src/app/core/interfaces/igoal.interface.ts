import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface IGoal {
    name: string,
    amount: Number,
    date: string,
    icon: IconName,
    color: string
}

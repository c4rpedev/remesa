import { IconName, IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ITransactions {
    reciever: string,
        type: string,
        date: string,
        amount: number,
        icon: IconName
}

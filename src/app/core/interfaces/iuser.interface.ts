import { ICard } from "./icard.interface";
import { IFriends } from "./ifriends.service";
import { IGoal } from "./igoal.interface";
import { ITransactions } from "./itransactions.interface";

export interface IUser {
    user:{
        name: string;
        role: string;
        cards: ICard[];
        goals: IGoal[];        
        friends: IFriends[];
    }
    
}

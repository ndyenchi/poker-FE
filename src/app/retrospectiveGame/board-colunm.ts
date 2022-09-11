import { Discussion } from "./discussion";

export class BoardColumn {
    id:number;
    title:string;
    order_colum: number;
    discussionList: Discussion[] = [];
}

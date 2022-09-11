import { Comment } from "./comment";

export class Discussion {
    id: number;
    content: string;
    createDate:Date;
    user_id: number;
    boardColunm_id :number;
    displayName:string;
    numberVote: number;
    numberUnvote: number;
    commentList: Comment[] = [];
}

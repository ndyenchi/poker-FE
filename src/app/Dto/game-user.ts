import { Game } from "./game";
import { GameUserID } from "./game-user-id"
import { User } from "./user";

export class GameUser {

    gameUserID: GameUserID;
    flipCard: boolean;
    user: User[];
    game: Game[]
    point: number
}


import { deserializable } from "./deserializable";
import { GamePoker } from "./game-poker";

export class IssuePoker implements deserializable {
    id: number;
    
    title: string;
    key: string;
    description: string;
    link: string;
    game: GamePoker;
    status: boolean;
     average:number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

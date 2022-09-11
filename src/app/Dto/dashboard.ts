import {deserializable} from '../model/deserializable';

export class Dashboard implements deserializable{
    idUser: number;
    url: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

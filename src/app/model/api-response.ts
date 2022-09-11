export interface ApiResponse<T> {
    success: boolean;
    message: string;
    type: string;
    data: T;
    // statusCode: string;
    // statusCodeValue: number;
}

export interface FlipCard {
    flipCard: boolean;
    idUser: number;
}
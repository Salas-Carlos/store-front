import { CardTokenReponse } from "./card-token.response";
import { CreateCardTokenCommand } from "./commands/create-card-token.command";


export interface CardsRepository {
    createCardToken(createCardTokenCommand: CreateCardTokenCommand): Promise<CardTokenReponse>
}
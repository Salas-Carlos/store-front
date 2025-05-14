import { Client } from "../client";
import { CardsRepository } from "@/model/cards/cards.repository";
import { CreateCardTokenCommand } from "@/model/cards/commands/create-card-token.command";
import { CardTokenReponse } from "@/model/cards/card-token.response";



const createCardToken = async (createCardTokenCommand: CreateCardTokenCommand): Promise<CardTokenReponse> => {
    const url = 'cards';
    const response = await Client.call<{
        cardToken: string;
    }>({ url, method: 'post', data: createCardTokenCommand });
    return {
        cardToken: response.data.cardToken
    }
}

export const cardsService: CardsRepository = {
    createCardToken
}
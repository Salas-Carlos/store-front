import { CardsRepository } from '@/model/cards/cards.repository';
import { CreateCardTokenCommand } from '@/model/cards/commands/create-card-token.command';


export class CreateCardtokenUseCase {
    constructor(private readonly cardsService: CardsRepository) { }

    async apply(body: CreateCardTokenCommand) {
        return this.cardsService.createCardToken(body);
    }
}
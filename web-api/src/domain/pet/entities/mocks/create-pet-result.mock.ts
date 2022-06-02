export class CreatePetResult {
    success: boolean;
    id: string;

    constructor(success?: boolean, id?: string) {
        this.success = success;
        this.id = id;
    }
}

enum OrderStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    COMPLETED = 'completed',
    CANCELED = 'canceled'
}

export class Order {
    id: string;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        status: OrderStatus
    ) {
        this.id = id;
        this.status = status;
        this.createdAt = new Date(); // Set creation date to current date
        this.updatedAt = new Date(); // Set update date to current date
    }

}

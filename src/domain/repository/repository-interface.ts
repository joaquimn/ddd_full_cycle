//generics <T> - <T> will be the aggregate

export default interface RepositoryInterface<T> {

    // create and update methods will always return a void promise
    // because the object is already available in the memory in the moment that it will be created or updated
    // needs to use uuid to create a unique id in the moment that the object is being instantiated
    // in this way, we don't need to return the object from the database just to have the DB PK
    // the PK in the DBs won't be auto-incremented, it will be a uuid
    

    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;


}
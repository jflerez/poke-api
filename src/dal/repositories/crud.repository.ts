import mongoose, { Model } from "mongoose";

export class CrudRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async create(item: T) {
    console.log("createeeeeee", item);
    console.log("_repository", this._repository);
    return await this._repository.create(item);
  }

  async update(_id: string, item: T) {
    return await this._repository.findByIdAndUpdate({ _id: _id }, { item });
  }

  async findAll() {
    return await this._repository.find();
  }

  async findOne(query: object) {
    return await this._repository.findOne(query);
  }

  async findOneById(id: string) {
    const ObjectId = mongoose.Types.ObjectId;

    const objectId = new ObjectId(id);

    return await this._repository.findById(objectId);
  }
}

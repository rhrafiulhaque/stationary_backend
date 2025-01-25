"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const search = this.query.search;
        if (search) {
            const searchQuery = {
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: "i" },
                })),
            };
            this.modelQuery = this.modelQuery.find(searchQuery);
        }
        return this;
    }
    filter() {
        const filterField = this.query.filter;
        if (filterField) {
            this.modelQuery = this.modelQuery
                .find({ author: filterField })
                .populate("author");
        }
        return this;
    }
    sort() {
        const sortBy = this.query.sortBy;
        const sortOrder = this.query.sortOrder === "asc" ? "" : "-";
        if (sortBy) {
            this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
        }
        else {
            this.modelQuery = this.modelQuery.sort("-createdAt"); // Default sort by newest
        }
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        const fields = this.query.fields;
        if (fields) {
            this.modelQuery = this.modelQuery.select(fields.split(",").join(" "));
        }
        else {
            this.modelQuery = this.modelQuery.select("-__v");
        }
        return this;
    }
}
exports.default = QueryBuilder;

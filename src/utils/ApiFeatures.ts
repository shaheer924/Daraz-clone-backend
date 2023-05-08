class ApiFeatures {
    public query: any
    public queryString: any
    constructor(query: any, queryString: any) {
        this.query = query
        this.queryString = queryString
    }

    public filter = () => {
        // @ts-ignore
        const queryObj = {...this.queryString}
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(el => delete queryObj[el])
        this.query = this.query.find(queryObj)
        return this.query
    }

    public pagination = () => {
        let page = this.queryString?.page || 1
        // @ts-ignore
        let limit = this.queryString?.limit || 10
        // @ts-ignore
        let skip = (page - 1) * limit

        console.log(limit, skip)
        let queryRes = this.query.find().limit(limit).skip(skip)
        return queryRes
    }
    //
    // sorting = (param: string, sort: string = "asc") => {
    //     let sortQuery = sort == "asc" ? 1 : -1
    //     return this.query.sort({param: sortQuery})
    // }
}

export default ApiFeatures
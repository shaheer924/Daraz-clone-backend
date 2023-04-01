class BaseRepos {
    public model: any
    constructor(model: any) {
        this.model = model
    }

    index = (query: any) => {
        return this.model.find(query)
    }

    store = async (data: any ) => {
        return this.model.create(data)
    }

    show = async (id: string) => {
        return this.model.findById(id)
    }

    update = async (id: string, data:  any) => {
        return this.model.update({_id: id}, data)
    }

    delete = async (id: string) => {
        return this.model.delete(id)
    }
}

export default BaseRepos
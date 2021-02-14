import Package from "../../models/package.model.js"

export const create = async (req, res) => {
    const { title, imageUrl, description, fileUrl, price } = req.body

    await Package.create({
        title: title,
        imageUrl: imageUrl,
        description: description,
        fileUrl: fileUrl,
        price: price
    })

    return res.status(201).json({
        message: "post has been created."
    })
}

export const deleteById = async (req, res) => {
    const id = req.params.id
    const the_package = await Package.findOne({
        where: {
            id: id
        }
    })

    if (the_package == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    await the_package.destroy()

    res.status(200).json({
        message: `Deleted!`
    })
}


export const update = async (req, res) => {
    const id = req.params.id
    const { title, imageUrl, description, fileUrl, price } = req.body
    const the_package = await Package.findOne({
        where: {
            id: id
        }
    })

    if (the_package == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    the_package.title = title === undefined ? the_package.title : title
    the_package.imageUrl = imageUrl === undefined ? the_package.imageUrl : imageUrl
    the_package.description = description === undefined ? the_package.description : description
    the_package.fileUrl = fileUrl === undefined ? the_package.fileUrl : fileUrl
    the_package.price = price === undefined ? the_package.price : price

    await the_package.save()

    res.status(200).json({
        message: `Updated!`
    })
}

export const get = async (req, res) => {
    const id = req.params.id
    const the_package = await Package.findOne({
        where: {
            id: id
        }
    })

    if (the_package == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    res.status(200).json(the_package)
}

export const getAll = async (req, res) => {
    const packages = await Package.findAll()
    res.status(200).json(
        packages.sort((a, b) => b.createdAt - a.createdAt)
    )
}

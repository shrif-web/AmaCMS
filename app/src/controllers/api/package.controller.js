import Package from "../../models/package.model.js"

export const create = async (req, res) => {
    const { title, imageUrl, description, fileUrl } = req.body

    await Package.create({
        title: title,
        imageUrl: imageUrl,
        description: description,
        fileUrl: fileUrl,
    })

    return res.status(201).json({
        message: "post has been created."
    })
}

export const deleteById = async (req, res) => {
    const id = req.params.id
    const package = await Package.findOne({
        where: {
            id: id
        }
    })

    if (package == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    await package.destroy()

    res.status(200).json({
        message: `Deleted!`
    })
}


export const update = async (req, res) => {
    const id = req.params.id
    const { title, imageUrl, description, fileUrl } = req.body
    const package = await Package.findOne({
        where: {
            id: id
        }
    })

    if (package == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    package.title = title === undefined ? package.title : title
    package.imageUrl = imageUrl === undefined ? package.imageUrl : imageUrl
    package.description = description === undefined ? package.description : description
    package.fileUrl = fileUrl === undefined ? package.fileUrl : fileUrl

    await package.save()

    res.status(200).json({
        message: `Updated!`
    })
}

export const get = async (req, res) => {
    const id = req.params.id
    const package = await Package.findOne({
        where: {
            id: id
        }
    })

    if (package == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    res.status(200).json(package)
}

export const getAll = async (req, res) => {
    const packages = await Package.findAll()
    res.status(200).json(
        packages.sort((a, b) => b.createdAt - a.createdAt)
    )
}

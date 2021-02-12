import fs from "fs"
import path from "path"

const __dirname = path.resolve()

export const upload = async (req, res) => {
    const type = req.params.type

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file
    const dir = `/static/${type}`
    const filePath = `${dir}/${file.name}`

    fs.access(path.join(__dirname, dir), async err => {
        if (err) {
            await fs.promises.mkdir(path.join(__dirname, dir), { recursive: true })
        }

        file.mv(path.join(__dirname, filePath), err => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: err
                })
            }

            res.status(200).json({
                location: filePath
            })
        })
    })
}

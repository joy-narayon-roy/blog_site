module.exports = (req, res)=> {
    if (req.file) {
        return res.status(200).json({
            imgUrl: `/uploads/${req.file.filename}`
        })

    }
}


/*obj={
            imgUrl:`/uploads/${req.file.filename}`
        }*/
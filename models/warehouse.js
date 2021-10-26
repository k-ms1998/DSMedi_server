module.exports = mongoose => {
    return warehouse = mongoose.model(
        'warehouse',
        mongoose.Schema({
            _id: String,
            x: Number,
            y: Number,
            item: [String],
        },
        {
            timestamps: false,
            versionKey: false
        })
    );

}

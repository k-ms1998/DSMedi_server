module.exports = mongoose => {
    return warehouse = mongoose.model(
        'inventory',
        mongoose.Schema({
            _id: String,
            name: String,
            x: Number,
            y: Number,
            count: Number
        },
        {
            timestamps: false,
            versionKey: false
        })
    );

}

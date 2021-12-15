module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            type: String,
            info: Object,
            link: String,
            description: String,
            title: String
        },
        { 
            timestamps: true 
        }
    );
  
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Image = mongoose.model("images", schema);
    return Image;
  };
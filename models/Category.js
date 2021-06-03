const   mongoose      = require('mongoose'),
        slugify       = require('slugify'),
        Schema        = mongoose.Schema;


const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
})

//Veritabanına kaydetmeden önce isme göre slug oluşturmasını istedik.
CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
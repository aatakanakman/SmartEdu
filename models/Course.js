const   mongoose      = require('mongoose'),
        slugify       = require('slugify'),
        Schema        = mongoose.Schema;


const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

//Veritabanına kaydetmeden önce isme göre slug oluşturmasını istedik.
CourseSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
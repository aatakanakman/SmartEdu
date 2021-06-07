const   Course          = require('../models/Course'),
        Category        =require('../models/Category')


//kurs oluşturma fonksiyonumuz
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name : req.body.name,
            description : req.body.description,
            category : req.body.category,
            user : req.session.userID
        });
        res.status(201).redirect('/courses')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}


//Kursları getirme fonksiyonumuz.
exports.getAllCourses = async (req, res) => {

    //kursları getirirken kategoriye göre sıralama yapmak için;
    try {

        //requestten gelen slug ifadesini değişkene atıyoruz.
        const categorySlug = req.query.categories;

        //slug ifadesine göre kategori alıyoruz.
        const category = await Category.findOne({
            slug: categorySlug
        })

        let filter = {};

        //eğer kategori slug'ı boş değilse vt den istek yaparken aldığımız kategorinin id'sini filter objesine atıp
        if (categorySlug) {
            filter = {
                category: category._id
            }
        }

        // filter objesine göre listelliyoruz.
        const courses = await Course.find(filter).sort('-createdAt')
        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}


// tekil kurs listelemek için fonksiyon
//Populate user referansından bilgileri almak için kullanılır.
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({
            slug: req.params.slug
        }).populate('user')

        res.status(200).render('course', {
            course,
            page_name: 'courses'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}
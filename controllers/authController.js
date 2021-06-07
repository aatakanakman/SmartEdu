const   User              = require('../models/User'),
        bcrypt            = require('bcrypt'),
        Category          = require('../models/Category'),
        Course           = require('../models/Course')

// Kullanıcı oluşturma için fonskiyon. 

exports.createUser = async (req, res) => {
    try {
    const user = await User.create(req.body);
        res.status(201).redirect('/login')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

//Kullanıcı giriş işlemi için fonksiyon
exports.loginUser = async (req, res) => {
    try {
        //requestten gelen email ve pass i alıyoruz.
        const {email , password} = req.body;
        //email yoksa hatayı varsa emaile kayıtlı user ı alıyoruz.
        await User.findOne({email}, (err,user) => {
            //user varsa
            if(user){
                //hashlenmiş olan şifreyi compare ederek eşleşiyorsa  yeni bir user session oluşturuyoruz.
                bcrypt.compare(password,user.password,(err,same)=>{
                    if(same){
                        //USER SESSION
                        req.session.userID = user._id;
                        res.status(200).redirect('/users/dashboard')
                    }
                    else{
                        res.status(400).send("yanlış şifre")
                    }
                });
            }
            else{
                res.status(400).send("kullanıcı yok")
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

//kullanıcı çıkış işlemi
exports.logoutUser = (req,res) => {

    req.session.destroy(() => {
        res.redirect('/');
    })
}

//kullanıcı girişine özel olan dashboard sayfasını burdan çağırıyoruz.
exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({_id : req.session.userID})
    const categories = await Category.find();
    const courses = await Course.find({user : req.session.userID}).sort('-createdAt')
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses
    })
}
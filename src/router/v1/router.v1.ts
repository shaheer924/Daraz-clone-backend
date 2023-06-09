import express, {Request, Response} from "express";
import router from "../router";
import UserController from "../../controller/UserController";
import AuthenticationMiddleware from "../../middleware/AuthenticationMiddleware";
import multer from 'multer'
import ProductController from "../../controller/ProductController";
import ReviewController from "../../controller/ReviewController";
import CartController from "../../controller/CartController";

const storage = multer.diskStorage({
    destination: function (req: Request, file,cb) {
        cb(null , 'uploads/')
    },
    filename: function (req: Request, file,cb) {
        const fileName = `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`
        cb(null, fileName)
    }
})

const uploads = multer({storage: storage})

const Route = express.Router()

Route.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        "status": 'Server is running',
        "date": (new Date()),
        "project-name": "ecommerce-backend-app",
    })
})

Route.post('/user/register', UserController.register)
Route.post('/user/login', UserController.login)
Route.post('/user/verify-email', UserController.verifyEmail)
Route.post('/user/verify-otp', UserController.verifyOtp)
Route.post('/user/forgot-password', UserController.forgotPassword)
Route.post('/user/reset-password/:reset_token', UserController.reset_password)

Route.post('/product/create-product',ProductController.createProduct)

Route.post('/cart/add-to-cart', CartController.addToCart)
Route.use(AuthenticationMiddleware)
Route.get('/users', UserController.index)
Route.post('/user/change-password',UserController.changePassword)
Route.delete('/user/:id', UserController.unActiveUser)

Route.get('/products',ProductController.getProducts)
Route.get('/product/:id',ProductController.show)
Route.get('/products/discounted-products', ProductController.getDiscountedProducts)

Route.post("/reviews/create-reviews", ReviewController.store)
Route.get("/reviews/get-reviews-by-product", ReviewController.getReviewsByProduct)

export default Route
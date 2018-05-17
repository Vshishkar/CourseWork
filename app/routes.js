var AuthenticationController = require('./controllers/authentication'),
    TodoController = require('./controllers/todos'),
    PostController = require('./controllers/posts'),
    UserController = require('./controllers/users'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});


module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        postRoutes = express.Router(),
        todoRoutes = express.Router(),
        userRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });


    // User Routes
    apiRoutes.use('/account',userRoutes);
    userRoutes.post('/update',requireAuth,AuthenticationController.roleAuthorization(['user','admin']),UserController.addAccountInfo);

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['admin']), TodoController.deleteTodo);


    //Post Routes
    apiRoutes.use('/posts',postRoutes);

    postRoutes.get('/:username', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), PostController.getPostsByUsername);
    postRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), PostController.getPosts);
    postRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), PostController.createPost);
    postRoutes.post('/likes/username', requireAuth, AuthenticationController.roleAuthorization(['user','admin']), PostController.leaveLike);
    postRoutes.delete('/:post_id', requireAuth, AuthenticationController.roleAuthorization(['admin']), PostController.deletePost);


    // Set up routes
    app.use('/api', apiRoutes);

};
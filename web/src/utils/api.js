export const api = {
    login: '/auth/login',
    me: '/users/me',
    editAdmin: '/users/editAdmin/',
    editPassword: '/users/editPassword/',

    // USERS
    getUsers: '/users/allUser',
    saveUser: '/users/saveUser',
    editUser: '/users/edit/',
    deleteUser: '/users/delete/',
    inputTrade: '/inputProduct/calculateResidue',
    getInputTrade: '/inputProduct/getByUserId/',
    getTotalPrice: '/users/getTotalPrice/',

    //PRODUCTS
    getProducts: '/product/getAllProduct',
    addProducts: '/product/add',
    editProduct: '/product/edit/',
    deleteProduct: '/product/delete/',
    getOneProduct: '/product/getById/',

    //ORDERS
    getOrders: '/orders/getAllOrders',
    addOrders: '/orders/addOrder',
    getOrderCount: '/orders/getCountOrder',
    getByUserId: '/orders/getById/',
    getLastDayUsers:'/orders/getLastOrdersByUser',
}

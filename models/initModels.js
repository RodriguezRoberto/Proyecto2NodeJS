const { User } = require('./user.model');
const { Restaurant } = require('./restaurant.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Review } = require('./review.model');

// Establish your models relations inside this function
const initModels = () => {
    User.hasMany( Review );
    Review.belongsTo( User );

    User.hasMany( Order );
    Order.belongsTo( User );

    Restaurant.hasMany( Review );
    Review.belongsTo( Restaurant );
    
    Restaurant.hasMany( Meal );
    Meal.belongsTo( Restaurant );

    Restaurant.hasMany( Order );
    Order.belongsTo( Restaurant );

    Meal.hasMany( Order );
    Order.belongsTo( Meal );
};

module.exports = { initModels }; 
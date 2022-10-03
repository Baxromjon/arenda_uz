package io.fl.water_delivery.repository;

import io.fl.water_delivery.entity.Order;
import io.fl.water_delivery.projection.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Query(nativeQuery = true, value = "select u.first_name   as firstName,\n" +
            "       u.last_name    as lastName,\n" +
            "       u.phone_number as phoneNumber,\n" +
            "       o.was_given    as wasGiven,\n" +
            "       o.created_at   as createdAt,\n" +
            "       p.name         as productName,\n" +
            "       o.order_price  as orderPrice\n" +
            "from orders o\n" +
            "         inner join orders_products op on o.id = op.order_id\n" +
            "         inner join product p on p.id = op.product_id\n" +
            "         inner join users_orders uo on o.id = uo.order_id\n" +
            "         inner join users u on uo.user_id = u.id\n" +
            "order by o.created_at desc\n" +
            "limit :size offset (:size * :page)")
    List<OrderProjection> getAllOrder(int page, int size);

    @Query(nativeQuery = true, value = "select count(o.id) as orderCount\n" +
            "from orders o")
    OrderProjection1 getAllOrderCount();

    @Query(nativeQuery = true, value = "select cast(u.id as varchar) as userId,\n" +
            "       o.created_at          as createdAt,\n" +
            "       o.order_price         as orderPrice,\n" +
            "       o.was_given           as wasGiven,\n" +
            "       p.name                as productName\n" +
            "from orders o\n" +
            "         inner join users_orders uo on o.id = uo.order_id\n" +
            "         inner join orders_products op on o.id = op.order_id\n" +
            "         inner join product p on p.id = op.product_id\n" +
            "         inner join users u on u.id = uo.user_id\n" +
            "where u.id = :userId\n" +
            "order by o.created_at desc\n" +
            "limit :size offset (:size * :page)")
    List<OrderProjection2> getAllOrderByUserId(UUID userId, int page, int size);


    @Query(nativeQuery = true, value = "select count(o.id)\n" +
            "from orders o\n" +
            "         inner join users_orders uo on o.id = uo.order_id\n" +
            "         inner join users u on u.id = uo.user_id\n" +
            "where u.id = :userId")
    long getAllOrderOfUser(UUID userId);

    @Query(nativeQuery = true, value = "select max(o.created_at)     as day,\n" +
            "       cast(u.id as varchar) as userId,\n" +
            "       u.first_name          as firstName,\n" +
            "       u.last_name           as lastName,\n" +
            "       u.phone_number        as phoneNumber\n" +
            "from orders o\n" +
            "         inner join users_orders uo on o.id = uo.order_id\n" +
            "         inner join users u on u.id = uo.user_id\n" +
            "where u.enabled = true\n" +
            "group by u.first_name, cast(u.id as varchar), u.last_name, u.phone_number\n" +
            "having extract('day' from current_date - max(o.created_at)) > 30")
    List<UsersOrderProjection> getOrdersMoreDay();

    @Query(nativeQuery = true, value = "with day as(select max(o.created_at)     as day,\n" +
            "       cast(u.id as varchar) as userId,\n" +
            "       u.first_name          as firstName,\n" +
            "       u.last_name           as lastName,\n" +
            "       u.phone_number        as phoneNumber\n" +
            "from orders o\n" +
            "         inner join users_orders uo on o.id = uo.order_id\n" +
            "         inner join users u on u.id = uo.user_id\n" +
            "group by u.first_name, cast(u.id as varchar), u.last_name, u.phone_number\n" +
            "having extract('day' from current_date - max(o.created_at)) > 30)\n" +
            "select count(userId) from day")
    int getLastOrderCount();

    @Query(nativeQuery = true, value = "select p.name as name, o.was_given as wasGiven\n" +
            "from orders o\n" +
            "         inner join orders_products op on o.id = op.order_id\n" +
            "         inner join product p on p.id = op.product_id\n" +
            "         inner join users_orders uo on o.id = uo.order_id\n" +
            "         inner join users u on u.id = uo.user_id\n" +
            "where u.id = :userId\n" +
            "order by o.created_at desc\n" +
            "limit 1")
    UserOrderProjection getProductByUserId(UUID userId);
}

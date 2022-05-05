package io.fl.water_delivery.repository;

import io.fl.water_delivery.entity.User;
import io.fl.water_delivery.projection.CountUserProjection;
import io.fl.water_delivery.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    UserDetails findByPhoneNumber(String s);
    Boolean existsByPhoneNumber(String phoneNumber);

    @Query(nativeQuery = true, value = "select cast(u.id as varchar) as userId,\n" +
            "       u.first_name          as firstName,\n" +
            "       u.last_name           as lastName,\n" +
            "       u.phone_number        as phoneNumber,\n" +
            "       u.address             as address,\n" +
            "       u.street              as street,\n" +
            "       u.home                as home,\n" +
            "       u.destination         as destination\n" +
            "from users u\n" +
            "         left join output_trade r2 on u.id = r2.user_id\n" +
            "         left join product p on r2.product_id = p.id\n" +
            "         inner join role r on r.id = u.role_id\n" +
            "where enabled = true\n" +
            "    and r.name = 'CLIENT'\n" +
            "    and (LOWER(u.first_name)\n" +
            "         like '%' || lower(:search) || '%'\n" +
            "    or u.phone_number like '%' || (:search) || '%'\n" +
            "        or '%' || (:search) || '%' like u.phone_number)\n" +
            "order by u.created_at desc\n" +
            "limit :size offset (:size * :page)")
    List<UserProjection> getAllUsers(String search, int page, int size);

    @Query(nativeQuery = true, value = "select count(u.id) as countUser from role r\n" +
            "                            inner join users u on r.id = u.role_id\n" +
            "where r.name='CLIENT'")
    CountUserProjection getAllUserCount();

    @Query(nativeQuery = true, value = "select count(u.id) from users u\n" +
            "inner join role r on r.id = u.role_id\n" +
            "where r.name='CLIENT'")
    long getCountUser();

    @Query(nativeQuery = true, value = "select sum(o.order_price) as totalPrice\n" +
            "from orders o\n" +
            "         inner join users_orders uo on o.id = uo.order_id\n" +
            "         inner join users u on u.id = uo.user_id\n" +
            "where u.id = :userId")
    double getTotalPriceByUserId(UUID userId);
}

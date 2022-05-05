package io.fl.water_delivery.service;

import io.fl.water_delivery.entity.*;
import io.fl.water_delivery.payload.ApiResponce;
import io.fl.water_delivery.payload.OrderDTO;
import io.fl.water_delivery.payload.ResPagination;
import io.fl.water_delivery.projection.*;
import io.fl.water_delivery.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * created by Baxromjon
 * 12.04.2022
 **/

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    OutputTradeRepository outputTradeRepository;
    @Autowired
    InputTradeRepository inputTradeRepository;
    @Autowired
    ResidueProductRepository residueProductRepository;

    //    public List<OrderProjection> getAll() {
//        long count = orderRepository.count();
//        return orderRepository.getAllOrder();
//    }
    public ResPagination getAll(int page, int size) {
        long count = orderRepository.count();
        return new ResPagination(page, size, (int) count / size, orderRepository.getAllOrder(page, size), count);
    }

    @Transactional(noRollbackFor = {NullPointerException.class})
    public ApiResponce add(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId()).orElseGet(User::new);
        Product product = productRepository.findById(orderDTO.getProductId()).orElseGet(Product::new);
        Order order = new Order(
                Collections.singletonList(user),
                Collections.singletonList(product),
                orderDTO.getWasGiven(),
                orderDTO.getWasGiven() * product.getPrice()
        );
        Optional<ResidueProduct> productOptional = residueProductRepository.getAllByUserIdAndProductId(user.getId(), product.getId());
        if (productOptional.isPresent()) {
            ResidueProduct residueProduct = productOptional.get();
            residueProduct.setAmount(residueProduct.getAmount() + order.getWasGiven());
            residueProductRepository.save(residueProduct);
        } else {
            ResidueProduct residueProduct = new ResidueProduct(
                    order.getWasGiven(), product, user
            );
            residueProductRepository.save(residueProduct);
        }
        orderRepository.save(order);
        product.setResidue(product.getResidue() - orderDTO.getWasGiven());
        productRepository.save(product);

        return new ApiResponce(true, "successfully ordered");
    }

    public OrderProjection1 getCount() {
        return orderRepository.getAllOrderCount();
    }

    public ResPagination getByUserId(UUID id, int page, int size) {
        long countOrder = orderRepository.getAllOrderOfUser(id);
        return new ResPagination(page, size, (int) countOrder / size, orderRepository.getAllOrderByUserId(id, page, size), countOrder);
    }

    public List<UsersOrderProjection> getLastOrdersByUser() {
        return orderRepository.getOrdersMoreDay();
    }
}

package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.OrderRequest;
import aptech.finalproject.dto.response.product.OrderResponse;
import aptech.finalproject.entity.auth.User;
import aptech.finalproject.entity.product.Order;
import aptech.finalproject.entity.product.Payment;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.OrderMapper;
import aptech.finalproject.repository.UserRepository;
import aptech.finalproject.repository.product.OrderRepository;
import aptech.finalproject.repository.product.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = orderMapper.toOrder(orderRequest);

        User user = userRepository.findById(orderRequest.getUserId())
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
        order.setUser(user);

        Payment payment = paymentRepository.findById(orderRequest.getPaymentId())
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_NOT_FOUND));
        order.setPayment(payment);

        return orderMapper.toOrderResponse(orderRepository.save(order));
    }

    @Transactional
    public OrderResponse updateOrder(Long id, OrderRequest orderRequest) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.ORDER_NOT_FOUND));

        orderMapper.updateOrder(order, orderRequest);

        User user = userRepository.findById(orderRequest.getUserId())
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
        order.setUser(user);

        Payment payment = paymentRepository.findById(orderRequest.getPaymentId())
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_NOT_FOUND));
        order.setPayment(payment);

        return orderMapper.toOrderResponse(orderRepository.save(order));
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new ApiException(ErrorCode.ORDER_NOT_FOUND);
        }
        orderRepository.deleteById(id);
    }

    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.ORDER_NOT_FOUND));
        return orderMapper.toOrderResponse(order);
    }

    public List<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .stream()
                .map(orderMapper::toOrderResponse)
                .collect(Collectors.toList());
    }
}

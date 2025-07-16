package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.OrderDetailRequest;
import aptech.finalproject.dto.response.product.OrderDetailResponse;
import aptech.finalproject.entity.product.OrderDetail;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.OrderDetailMapper;
import aptech.finalproject.repository.product.OrderDetailRepository;
import aptech.finalproject.repository.product.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderDetailMapper orderDetailMapper;

    @Autowired
    private OrderRepository orderRepository;

    public OrderDetailResponse createOrderDetail(OrderDetailRequest orderDetailRequest) {
        OrderDetail orderDetail = orderDetailMapper.toOrderDetail(orderDetailRequest);

        return orderDetailMapper
                .toOrderDetailResponse(orderDetailRepository.save(orderDetail));
    }

    public OrderDetailResponse updateOrderDetail(Long id, OrderDetailRequest orderDetailRequest) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.ORDER_DETAIL_NOT_FOUND));

        orderDetailMapper.updateOrderDetail(orderDetail, orderDetailRequest);

        return orderDetailMapper.toOrderDetailResponse(orderDetailRepository.save(orderDetail));
    }

    public void deleteOrderDetail(Long id) {
        if (!orderDetailRepository.existsById(id)) {
            throw new ApiException(ErrorCode.ORDER_DETAIL_NOT_FOUND);
        }
        orderDetailRepository.deleteById(id);
    }

    public List<OrderDetailResponse> getAllOrderDetails(Pageable pageable) {
        return orderDetailRepository.findAll(pageable)
                .stream()
                .map(orderDetailMapper::toOrderDetailResponse)
                .collect(Collectors.toList());
    }

    public OrderDetailResponse getOrderDetailById(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.ORDER_DETAIL_NOT_FOUND));

        return orderDetailMapper.toOrderDetailResponse(orderDetail);
    }
}

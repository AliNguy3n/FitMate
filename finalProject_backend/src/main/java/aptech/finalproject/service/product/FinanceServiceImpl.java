package aptech.finalproject.service.product;

import aptech.finalproject.dto.response.product.FinanceResponse;
import aptech.finalproject.entity.product.Order;
import aptech.finalproject.entity.product.OrderDetail;
import aptech.finalproject.repository.product.OrderDetailRepository;
import aptech.finalproject.repository.product.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FinanceServiceImpl implements FinanceService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public FinanceResponse getOrderStatsByDay(LocalDate date) {
        List<Order> orders = orderRepository.findByOrderDateBetween(
                date.atStartOfDay().toInstant(java.time.ZoneOffset.UTC),
                date.plusDays(1).atStartOfDay().toInstant(java.time.ZoneOffset.UTC)
        );
        FinanceResponse response = new FinanceResponse();
        response.setOrderCount(orders.size());
        return response;
    }

    @Override
    public FinanceResponse getOrderStatsByWeek(int year, int week) {
        LocalDate start = LocalDate.ofYearDay(year, 1)
                .with(WeekFields.ISO.weekOfYear(), week)
                .with(WeekFields.ISO.dayOfWeek(), 1);
        LocalDate end = start.plusWeeks(1);
        List<Order> orders = orderRepository.findByOrderDateBetween(
                start.atStartOfDay().toInstant(java.time.ZoneOffset.UTC),
                end.atStartOfDay().toInstant(java.time.ZoneOffset.UTC)
        );
        FinanceResponse response = new FinanceResponse();
        response.setOrderCount(orders.size());
        return response;
    }

    @Override
    public FinanceResponse getOrderStatsByMonth(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.plusMonths(1);
        List<Order> orders = orderRepository.findByOrderDateBetween(
                start.atStartOfDay().toInstant(java.time.ZoneOffset.UTC),
                end.atStartOfDay().toInstant(java.time.ZoneOffset.UTC)
        );
        FinanceResponse response = new FinanceResponse();
        response.setOrderCount(orders.size());
        return response;
    }

    @Override
    public FinanceResponse getSalesStatsByDay(LocalDate date) {
        List<Order> orders = orderRepository.findByOrderDateBetween(
                date.atStartOfDay().toInstant(java.time.ZoneOffset.UTC),
                date.plusDays(1).atStartOfDay().toInstant(java.time.ZoneOffset.UTC)
        );
        BigDecimal totalSales = orders.stream()
                .map(order -> order.getTotalAmount() != null ? order.getTotalAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        FinanceResponse response = new FinanceResponse();
        response.setTotalSales(totalSales);
        return response;
    }

    @Override
    public FinanceResponse getSalesStatsByMonth(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.plusMonths(1);
        List<Order> orders = orderRepository.findByOrderDateBetween(
                start.atStartOfDay().toInstant(java.time.ZoneOffset.UTC),
                end.atStartOfDay().toInstant(java.time.ZoneOffset.UTC)
        );
        BigDecimal totalSales = orders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        FinanceResponse response = new FinanceResponse();
        response.setTotalSales(totalSales);
        return response;
    }

    @Override
    public FinanceResponse getSalesStatsByYear(int year) {
        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = start.plusYears(1);
        List<Order> orders = orderRepository.findByOrderDateBetween(
                start.atStartOfDay().toInstant(java.time.ZoneOffset.UTC),
                end.atStartOfDay().toInstant(java.time.ZoneOffset.UTC)
        );
        BigDecimal totalSales = orders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        FinanceResponse response = new FinanceResponse();
        response.setTotalSales(totalSales);
        return response;
    }

    @Override
    public List<FinanceResponse.TopProduct> getTopSellingProducts(int limit) {
        List<OrderDetail> details = orderDetailRepository.findAll();
        Map<Long, FinanceResponse.TopProduct> productMap = new HashMap<>();
        for (OrderDetail detail : details) {
            Long productId = detail.getProduct().getId();
            FinanceResponse.TopProduct top = productMap.getOrDefault(productId, new FinanceResponse.TopProduct());
            top.setProductId(productId);
            top.setProductName(detail.getProduct().getName());
            top.setQuantitySold(top.getQuantitySold() + (detail.getQuantity() != null ? detail.getQuantity() : 0));
            productMap.put(productId, top);
        }
        return productMap.values().stream()
                .sorted(Comparator.comparingInt(FinanceResponse.TopProduct::getQuantitySold).reversed())
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Override
    public List<FinanceResponse.TopProduct> getTopValueProducts(int limit) {
        List<OrderDetail> details = orderDetailRepository.findAll();
        Map<Long, FinanceResponse.TopProduct> productMap = new HashMap<>();
        for (OrderDetail detail : details) {
            Long productId = detail.getProduct().getId();
            FinanceResponse.TopProduct top = productMap.getOrDefault(productId, new FinanceResponse.TopProduct());
            top.setProductId(productId);
            top.setProductName(detail.getProduct().getName());
            top.setTotalValue(top.getTotalValue() == null ? BigDecimal.ZERO : top.getTotalValue());
            BigDecimal unitPrice = detail.getUnitPrice() != null ? BigDecimal.valueOf(detail.getUnitPrice()) : BigDecimal.ZERO;
            int quantity = detail.getQuantity() != null ? detail.getQuantity() : 0;
            BigDecimal value = unitPrice.multiply(BigDecimal.valueOf(quantity));
            top.setTotalValue(top.getTotalValue().add(value));
            productMap.put(productId, top);
        }
        return productMap.values().stream()
                .sorted(Comparator.comparing(FinanceResponse.TopProduct::getTotalValue).reversed())
                .limit(limit)
                .collect(Collectors.toList());
    }
}
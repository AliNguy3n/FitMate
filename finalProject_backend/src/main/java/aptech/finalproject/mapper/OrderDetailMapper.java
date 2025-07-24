package aptech.finalproject.mapper;

import aptech.finalproject.dto.request.product.OrderDetailRequest;
import aptech.finalproject.dto.response.product.OrderDetailResponse;
import aptech.finalproject.entity.product.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
    @Mapping(target = "id", source = "id")
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "unitPrice", source = "unitPrice")
    @Mapping(target = "subTotal", source = "subTotal")
    OrderDetailResponse toOrderDetailResponse(OrderDetail orderDetail);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "unitPrice", source = "unitPrice")
    @Mapping(target = "subTotal", source = "subTotal")
    OrderDetail toOrderDetail(OrderDetailRequest orderDetailRequest);

    @Mapping(target = "id", ignore = true)
    void updateOrderDetail(@MappingTarget OrderDetail orderDetail, OrderDetailRequest orderDetailRequest);
}

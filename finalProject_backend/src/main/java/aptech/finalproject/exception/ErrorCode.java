package aptech.finalproject.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    USER_UNAUTHORIZED(401, "Unauthorized"),
    USER_EXISTED(400, "User existed!"),
    USER_NOT_FOUND(404, "User not found!"),
    USER_UNAUTHENTICATED(401, "Unauthenticated"),
    USERNAME_INVALID(401, "Username must be between 3 and 30 characters"),
    PASSWORD_INVALID(401, "Password must be between 3 and 30 characters"),
    KEYWORD_INVALID(401, "Keyword not valid"),
    ;

    private int code;
    private String exception;

}

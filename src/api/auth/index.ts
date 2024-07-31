import request from "@/utils/request";

class AuthAPI {
  // 登录
  static login(data: LoginData) {
    return request<any, LoginResult>({
      url: "/api/v1/auth/login",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  //获取验证码
  static getCaptcha() {
    return request({
      url: "/api/v1/auth/captcha",
      method: "get",
    });
  }
}

export default AuthAPI;


/**
 * 登录请求参数
 */
export interface LoginData {
  username: string;
  password: string;
  captchaCode: string;
  captchaKey:string;
}
/**
* 登录响应
*/
export interface LoginResult {
  /**
   * 访问token
   */
  accessToken?: string;
  /**
   * 过期时间(单位：毫秒)
   */
  expires?: number;
  /**
   * 刷新token
   */
  refreshToken?: string;
  /**
   * token 类型
   */
  tokenType?: string;
}

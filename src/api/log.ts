import request from "@/utils/request";

const LOG_BASE_URL = "/api/v1/logs";

class LogAPI {
  //访问统计
  static getVisitStats() {
    return request<any, VisitStatsVO[]>({
      url: `${LOG_BASE_URL}/visit-stats`,
      method: "get",
    })
  }
  static getVisitTrend(params){
    return request({
      url:`${LOG_BASE_URL}/visit-trend`,
      method:'get',
      params:params
    })
  }
}

export default LogAPI;

/**  访问统计 */
export interface VisitStatsVO {
    /** 标题 */
    title: string;
    /** 类型 */
    type: "pv" | "uv" | "ip";
  
    /** 今日访问量 */
    todayCount: number;
    /** 总访问量 */
    totalCount: number;
    /** 同比增长率（相对于昨天同一时间段的增长率） */
    growthRate: number;
  
    totalCountOutput: number;
  }
  
  